# Competition Entity

**대회 엔티티** - 큐브 대회 정보 및 조회 API

## 📋 모델 구조

```typescript
interface Competition {
  idx: number;
  compName: string;
  compDateStart: Date;
  compDateEnd: Date;
  joinDateStart: Date;
  joinDateEnd: Date;
  baseFee: number;
  location: string;
  maxParticipate: number;
  createdAt: Date;
  updatedAt: Date;
  eventFeeList: EventFee[];
}

interface EventFee {
  idx: number;
  eventIdx: number;
  eventName: string;
  fee: number;
}

interface CompetitionSchedule {
  idx: number;
  compIdx: number;
  date: Date;
  roundScheduleList: RoundSchedule[];
}

interface RoundSchedule {
  idx: number;
  eventName: string;
  roundNum: number;
  startTime: Date;
}
```

## 🔧 API 함수

### getCompetition

단일 대회 조회

```typescript
import { getCompetition } from '@/entities/competition';

const competition = await getCompetition(123);
```

**응답:**
```typescript
{
  idx: 123,
  compName: "2026 서울 큐브 대회",
  compDateStart: new Date("2026-03-01"),
  compDateEnd: new Date("2026-03-02"),
  joinDateStart: new Date("2026-01-01T00:00:00"),
  joinDateEnd: new Date("2026-02-28T23:59:59"),
  baseFee: 10000,
  location: "서울 강남구",
  maxParticipate: 100,
  createdAt: new Date("2026-01-01T10:00:00"),
  updatedAt: new Date("2026-01-01T10:00:00"),
  eventFeeList: [...]
}
```

### getCompetitionPast

종료된 대회 목록 조회 (페이지네이션)

```typescript
import { getCompetitionPast } from '@/entities/competition';

const pastCompetitions = await getCompetitionPast({
  page: 0,
  size: 10,
  sort: [{ field: 'compName', direction: 'asc' }],
});
```

### getCompetitionNow

진행중인 대회 목록 조회 (페이지네이션)

```typescript
const currentCompetitions = await getCompetitionNow({ page: 0, size: 10 });
```

### getCompetitionFuture

예정된 대회 목록 조회 (페이지네이션)

```typescript
const futureCompetitions = await getCompetitionFuture({ page: 0, size: 10 });
```

### getCompetitionSchedule

대회 스케줄 조회

```typescript
import { getCompetitionSchedule } from '@/entities/competition';

const schedule = await getCompetitionSchedule(123);
```

## 📖 사용 예시

### 컴포넌트에서 사용

```typescript
import { getCompetition, getCompetitionNow } from '@/entities/competition';
import type { Competition } from '@/entities/competition';

const CompetitionListPage = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    loadCompetitions();
  }, []);
  
  const loadCompetitions = async () => {
    setLoading(true);
    try {
      const data = await getCompetitionNow({ page: 0, size: 10 });
      setCompetitions(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 에러');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;
  
  return (
    <div>
      {competitions.map(comp => (
        <div key={comp.idx}>
          <h3>{comp.compName}</h3>
          <p>장소: {comp.location}</p>
          <p>기간: {comp.compDateStart.toLocaleDateString()} ~ {comp.compDateEnd.toLocaleDateString()}</p>
          <p>참가비: {comp.baseFee.toLocaleString()}원</p>
        </div>
      ))}
    </div>
  );
};
```

## 🔄 DTO와 Model

### CompetitionDTO (백엔드 응답)

```typescript
interface CompetitionDTO {
  idx: number;
  compName: string;
  compDateStart: string;      // LocalDate "2026-03-01"
  compDateEnd: string;        // LocalDate "2026-03-02"
  joinDateStart: string;      // LocalDateTime "2026-01-01T00:00:00"
  joinDateEnd: string;        // LocalDateTime "2026-02-28T23:59:59"
  baseFee: number;
  location: string;
  maxParticipate: number;
  createdAt: string;          // LocalDateTime
  updatedAt: string;          // LocalDateTime
  eventFeeList: EventFeeDTO[];
}
```

### Competition (프론트엔드 사용)

```typescript
interface Competition {
  idx: number;
  compName: string;
  compDateStart: Date;        // Date 객체
  compDateEnd: Date;
  joinDateStart: Date;
  joinDateEnd: Date;
  baseFee: number;
  location: string;
  maxParticipate: number;
  createdAt: Date;
  updatedAt: Date;
  eventFeeList: EventFee[];
}
```

## 🔗 관련 기능

- **등록 엔티티**: [entities/registration](../registration/README.md)
- **상위 레이어**: [Entities Layer](../README.md)

## 📝 API 엔드포인트

| 함수 | HTTP | 엔드포인트 | 설명 |
|------|------|-----------|------|
| `getCompetition` | GET | `/comp/{compIdx}` | 단일 대회 조회 |
| `getCompetitionPast` | GET | `/comp/join/past` | 종료된 대회 목록 |
| `getCompetitionNow` | GET | `/comp/join/now` | 진행중인 대회 목록 |
| `getCompetitionFuture` | GET | `/comp/join/future` | 예정된 대회 목록 |
| `getCompetitionSchedule` | GET | `/schedule/{compIdx}` | 대회 스케줄 조회 |

---

**주의**: 이 엔티티는 **Read(조회)만** 담당합니다. 대회 생성, 수정, 삭제는 features/competition에서 수행됩니다.
