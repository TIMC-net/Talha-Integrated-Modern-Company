"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";

type Options = {
  /** Require pointer this many px inside edges before opening */
  inset?: number;
  /** Extra bottom inset so the photo edge line does not open the panel */
  bottomInset?: number;
  enterDelay?: number;
  leaveDelay?: number;
  enabled?: boolean;
  onChange?: (active: boolean) => void;
};

/**
 * Stable hover for photo cards.
 * - Opens only when the pointer is clearly inside (inset from edges) briefly
 * - Stays open while still over the card (so bottom panel content stays usable)
 * - Closes only after leave + short delay (no bottom-edge blink)
 */
export function useStableInsetHover<T extends HTMLElement = HTMLElement>({
  inset = 10,
  bottomInset = 16,
  enterDelay = 80,
  leaveDelay = 180,
  enabled = true,
  onChange,
}: Options = {}): {
  ref: RefObject<T | null>;
  active: boolean;
  handlers: {
    onPointerEnter: (e: ReactPointerEvent<T>) => void;
    onPointerMove: (e: ReactPointerEvent<T>) => void;
    onPointerLeave: (e: ReactPointerEvent<T>) => void;
  };
} {
  const ref = useRef<T | null>(null);
  const [active, setActive] = useState(false);
  const activeRef = useRef(false);
  const enterT = useRef(0);
  const leaveT = useRef(0);
  const lastBox = useRef<DOMRect | null>(null);
  const boxStamp = useRef(0);
  const moveRaf = useRef(0);
  const pendingPoint = useRef<{ x: number; y: number } | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const set = useCallback((next: boolean) => {
    if (activeRef.current === next) return;
    activeRef.current = next;
    setActive(next);
    onChangeRef.current?.(next);
  }, []);

  const clearTimers = useCallback(() => {
    if (enterT.current) {
      window.clearTimeout(enterT.current);
      enterT.current = 0;
    }
    if (leaveT.current) {
      window.clearTimeout(leaveT.current);
      leaveT.current = 0;
    }
    if (moveRaf.current) {
      window.cancelAnimationFrame(moveRaf.current);
      moveRaf.current = 0;
    }
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  useEffect(() => {
    if (!enabled) {
      clearTimers();
      set(false);
    }
  }, [enabled, clearTimers, set]);

  const getBox = useCallback(() => {
    const now = performance.now();
    // Cache geometry — getBoundingClientRect on every mousemove is expensive
    if (!lastBox.current || now - boxStamp.current > 100) {
      const el = ref.current;
      if (!el) return null;
      lastBox.current = el.getBoundingClientRect();
      boxStamp.current = now;
    }
    return lastBox.current;
  }, []);

  const pointInPad = useCallback(
    (
      clientX: number,
      clientY: number,
      pad: { t: number; r: number; b: number; l: number },
    ) => {
      const box = getBox();
      if (!box) return false;
      return (
        clientX >= box.left + pad.l &&
        clientX <= box.right - pad.r &&
        clientY >= box.top + pad.t &&
        clientY <= box.bottom - pad.b
      );
    },
    [getBox],
  );

  const requestOpen = useCallback(() => {
    if (leaveT.current) {
      window.clearTimeout(leaveT.current);
      leaveT.current = 0;
    }
    if (activeRef.current || enterT.current) return;
    enterT.current = window.setTimeout(() => {
      enterT.current = 0;
      set(true);
    }, enterDelay);
  }, [enterDelay, set]);

  const requestClose = useCallback(() => {
    if (enterT.current) {
      window.clearTimeout(enterT.current);
      enterT.current = 0;
    }
    if (!activeRef.current || leaveT.current) return;
    leaveT.current = window.setTimeout(() => {
      leaveT.current = 0;
      set(false);
    }, leaveDelay);
  }, [leaveDelay, set]);

  const cancelClose = useCallback(() => {
    if (leaveT.current) {
      window.clearTimeout(leaveT.current);
      leaveT.current = 0;
    }
  }, []);

  const evaluate = useCallback(
    (clientX: number, clientY: number) => {
      if (!enabled) return;
      if (activeRef.current) {
        // Once open: stay as long as cursor is over the card at all
        if (pointInPad(clientX, clientY, { t: 0, r: 0, b: 0, l: 0 })) {
          cancelClose();
        } else {
          requestClose();
        }
        return;
      }
      // Closed: only open from deep inside (avoids bottom-line flicker)
      if (
        pointInPad(clientX, clientY, {
          t: inset,
          r: inset,
          b: bottomInset,
          l: inset,
        })
      ) {
        requestOpen();
      } else if (enterT.current) {
        window.clearTimeout(enterT.current);
        enterT.current = 0;
      }
    },
    [
      enabled,
      inset,
      bottomInset,
      pointInPad,
      requestOpen,
      requestClose,
      cancelClose,
    ],
  );

  const onPointerEnter = useCallback(
    (e: ReactPointerEvent<T>) => {
      if (!enabled || e.pointerType === "touch") return;
      lastBox.current = null;
      evaluate(e.clientX, e.clientY);
    },
    [enabled, evaluate],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<T>) => {
      if (!enabled || e.pointerType === "touch") return;
      pendingPoint.current = { x: e.clientX, y: e.clientY };
      if (moveRaf.current) return;
      moveRaf.current = window.requestAnimationFrame(() => {
        moveRaf.current = 0;
        const p = pendingPoint.current;
        if (p) evaluate(p.x, p.y);
      });
    },
    [enabled, evaluate],
  );

  const onPointerLeave = useCallback(
    (_e: ReactPointerEvent<T>) => {
      if (!enabled || _e.pointerType === "touch") return;
      lastBox.current = null;
      if (enterT.current) {
        window.clearTimeout(enterT.current);
        enterT.current = 0;
      }
      requestClose();
    },
    [enabled, requestClose],
  );

  return {
    ref,
    active,
    handlers: { onPointerEnter, onPointerMove, onPointerLeave },
  };
}
