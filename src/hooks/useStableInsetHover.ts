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
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  useEffect(() => {
    if (!enabled) {
      clearTimers();
      set(false);
    }
  }, [enabled, clearTimers, set]);

  const pointInRect = (
    clientX: number,
    clientY: number,
    pad: { t: number; r: number; b: number; l: number },
  ) => {
    const el = ref.current;
    if (!el) return false;
    const box = el.getBoundingClientRect();
    return (
      clientX >= box.left + pad.l &&
      clientX <= box.right - pad.r &&
      clientY >= box.top + pad.t &&
      clientY <= box.bottom - pad.b
    );
  };

  /** Strict zone — only this can turn the panel ON */
  const isOpenZone = useCallback(
    (x: number, y: number) =>
      pointInRect(x, y, { t: inset, r: inset, b: bottomInset, l: inset }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- pointInRect uses ref
    [inset, bottomInset],
  );

  /** Loose zone — keeps panel open while reading bottom content */
  const isKeepZone = useCallback(
    (x: number, y: number) => pointInRect(x, y, { t: 0, r: 0, b: 0, l: 0 }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
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
        if (isKeepZone(clientX, clientY)) {
          cancelClose();
        } else {
          requestClose();
        }
        return;
      }
      // Closed: only open from deep inside (avoids bottom-line flicker)
      if (isOpenZone(clientX, clientY)) requestOpen();
      else {
        if (enterT.current) {
          window.clearTimeout(enterT.current);
          enterT.current = 0;
        }
      }
    },
    [enabled, isKeepZone, isOpenZone, requestOpen, requestClose, cancelClose],
  );

  const onPointerEnter = useCallback(
    (e: ReactPointerEvent<T>) => {
      if (!enabled || e.pointerType === "touch") return;
      evaluate(e.clientX, e.clientY);
    },
    [enabled, evaluate],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<T>) => {
      if (!enabled || e.pointerType === "touch") return;
      evaluate(e.clientX, e.clientY);
    },
    [enabled, evaluate],
  );

  const onPointerLeave = useCallback(
    (_e: ReactPointerEvent<T>) => {
      if (!enabled || _e.pointerType === "touch") return;
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
