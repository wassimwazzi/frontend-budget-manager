import { getCurrentDay } from '../../utils/dateUtils';
import { GoalStatusTypes } from './GoalStatus';

export function currentlyContributingTo(goal) {
    if (!goal.contributions?.length) {
        return true;
    }
    const today = getCurrentDay();
    const todayContribution = goal.contributions.find(({ start_date, end_date }) => {
        return start_date <= today && today <= end_date;
    });
    if (!todayContribution) {
        // future goals have no contributions
        return true;
    }
    if (todayContribution.percentage > 0) {
        return true;
    }
    return false;
}

export function getGoalRanking(goal) {
    if (goal.progress === 100 && goal.status === GoalStatusTypes.IN_PROGRESS) return 5;
    if (goal.status === GoalStatusTypes.IN_PROGRESS) return 4;
    if (!currentlyContributingTo(goal)) return 3;
    if (goal.status === GoalStatusTypes.PENDING) return 2;
    if (goal.status === GoalStatusTypes.COMPLETED) return 1;
    if (goal.status === GoalStatusTypes.FAILED) return 0;
}