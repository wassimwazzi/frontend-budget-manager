import { useEffect, useState } from "react"

export function useMultistepForm(steps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [visitedSteps, setVisitedSteps] = useState([0])

    useEffect(() => {
        setVisitedSteps((prev) => {
            if (prev.includes(currentStepIndex)) return prev
            return [...prev, currentStepIndex]
        })
    }, [currentStepIndex])

    function next() {
        setCurrentStepIndex(i => {
            if (i >= steps.length - 1) return i
            return i + 1
        })
    }

    function back() {
        setCurrentStepIndex(i => {
            if (i <= 0) return i
            return i - 1
        })
    }

    function goTo(index) {
        setCurrentStepIndex(index)
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        visitedSteps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        goTo,
        next,
        back,
    }
}