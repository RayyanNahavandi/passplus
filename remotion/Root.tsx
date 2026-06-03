import * as React from "react"
import { Composition } from "remotion"
import { DailyQuestion } from "./DailyQuestion"
import { exampleQuestion } from "./example"

export function RemotionRoot() {
  return (
    <Composition
      id="DailyQuestion"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      component={DailyQuestion as React.ComponentType<any>}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={900}
      defaultProps={{ ...exampleQuestion, audioSrc: undefined }}
    />
  )
}
