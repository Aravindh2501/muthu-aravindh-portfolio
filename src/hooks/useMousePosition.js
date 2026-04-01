import { useEffect, useRef } from 'react'

/**
 * Returns a ref with:
 *   .current.position  — { x, y } in pixels
 *   .current.normalised — { x, y } in [-1, 1] (WebGL NDC)
 *
 * Also returns those two as direct properties for destructuring:
 *   const { position, normalised } = useMousePosition()
 * But since they're refs internally, components that need live values
 * during animation frames should read from the ref directly.
 */
export function useMousePosition() {
  const state = useRef({
    position:   { x: 0, y: 0 },
    normalised: { x: 0, y: 0 },
  })

  useEffect(() => {
    const onMove = (e) => {
      state.current.position   = { x: e.clientX, y: e.clientY }
      state.current.normalised = {
        x:  (e.clientX / window.innerWidth)  * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Return the ref itself so R3F useFrame can read latest values without re-renders
  return state
}
