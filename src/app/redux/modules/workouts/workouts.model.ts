// Workouts
export interface IWorkouts {
  workouts: IWorkout[],
}

export interface IWorkout {
  id?: string
  // Workout start timestamp.
  startTS?: Date
  // Workout end timestamp. We don't know the value of this until a workout
  // ends.
  endTS?: Date
}

export interface IWorkoutsAction {
  type: string,
}

// lifts
export interface ILift {
  name: string;
}

export interface ILifts {
  [id: string]: ILift
}

type ProgressionScheme = "A" | "B"
const ProgressionSchemeEnum = {
  SETS_ACROSS: 'SETS_ACROSS' as ProgressionScheme,
}

// A group of sets. 'group' meaning that these sets are performed together.
// These are usually the same Lift.
export interface ISetGroup {
  // The ID's of the sets that belong to this set group.
  setIDs: string[];
  // The ID of the workout this set group belongs to.
  workoutID: string;
  // The ID of the planned workout this set group belongs to. That means this
  // set group hasn't been performed, but the user plans to perform it.
  plannedWorkoutID?: string;
  // How we generate future set groups based on this one.
  progressionScheme?: ProgressionScheme

  // Percentage we should increase in weight for the next set group.
  // 10 means we want to go 10% up in weight.
  percentUp: number;

  // The lift that the sets in this group are performing.
  liftID: string;

  // The number showing the order that these set groups were performed.
  // So if I do a set group of bench press first, that is set group 1.
  number: number;
}

export interface ISetGroups {
  [id: string]: ISetGroup;
}

export interface ISet {
  // The set group this set belongs to.
  setGroupID: string;

  // Set 1, 2, 3, etc.
  number: number;

  // Number of reps completed in this set.
  reps: number;
}

/**
 * Progress weight to the next one.
 */
export function progressWeight(
  weight: number,
  percentUp: number
): number {
  const roundToNearest = 5

  const beforeRounding = weight * (100 + percentUp) * 0.01

  const roundedDown = (beforeRounding - (beforeRounding % roundToNearest))
  if (roundedDown === weight) {
    const roundedUp = (weight + roundToNearest - (weight % roundToNearest))
    return roundedUp
  }

  return roundedDown
}
