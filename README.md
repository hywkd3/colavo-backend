# Description

주어진 가게 운영시간과 기존 예약 시간을 고려하여 새로운 예약을 등록하기 위한 예약 가능 시간표를 만들어줍니다.

# Environment

- node
- typescript
- express

# Prerequisite

패키지 설치하기

```
    npm install // npm 사용
    yarn        // yarn 사용
```

# Install

패키지 실행하기

```
    npm run start  // 서버 실행 시
    yarn start  // 서버 실행 시
```

# Parameter

- start_day_identifier: 검색 시작일 8자리 날짜(ex "20210910")
- days: 검색 시작일 이후 범위, 시작일을 포함한 날 수(ex 3)
- service_duration: 시술 시간, 초 단위 (ex 3600)
- timeslot_interval: 검색시 예약가능 시간 차이, 초 단위(ex 1800)
- is_ignore_schedule: 기존 스케쥴 무시하고 예약 가능 시간 리턴(ex TRUE)
- is_ignore_workhour: 기존 운영시간을 무시하고 예약 가능 시간 리턴(ex FALSE)
- timezone_identifier: 타임존 정보(ex "Asia/Seoul")
