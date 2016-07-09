// Workouts
export interface IWorkouts {
  workouts: IWorkout[],
}

export interface IWorkout {
  // Workout start timestamp.
  startTS: Date,
  // Workout end timestamp. We don't know the value of this until a workout
  // ends.
  endTS?: Date,
}

export interface IWorkoutsAction {
  type: string,
}

// lifts
export interface ILift {
  name: string;
}
