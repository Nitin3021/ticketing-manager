import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent
} from '@nptickets30/common'

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete
}
