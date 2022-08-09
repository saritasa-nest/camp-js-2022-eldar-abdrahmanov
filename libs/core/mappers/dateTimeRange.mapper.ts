import { DateTimeRangeDto } from '@js-camp/core/dtos/dateTimeRange.dto';
import { DateTimeRange } from '@js-camp/core/models/dateTimeRange';

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
