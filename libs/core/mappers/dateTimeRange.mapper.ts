import { DateTimeRangeDto } from '../dtos/dateTimeRange.dto';
import { DateTimeRange } from '../models/dateTimeRange';

export namespace DateTimeRangeMapper {

  /**
   * Maps dto to model.
   * @param dto Genre dto.
   */
  export function fromDto(dto: DateTimeRangeDto): DateTimeRange {
    return new DateTimeRange({
      start: new Date(dto.start),
      end: new Date(dto.end),
    });
  }
}
