# Registration Entity

**등록 엔티티** - 대회 참가 등록 정보 및 조회 API

## 📋 모델 구조

```typescript
interface Registration {
  id: number;
  competitionId: number;
  competitionName: string;
  name: string;
  enName: string;
  cckId: string;
  selectedEvents: string[];
  totalFee: number;
  paymentStatus: PaymentStatus;
  registrationStatus: RegistrationStatus;
  needRfCard: boolean;
}

interface RegistrationDetailed {
  id: number;
  competitionId: number;
  competitionName: string;
  name: string;
  enName: string;
  email: string;
  phone: string;
  cckId: string;
  wcaId: string;
  birthDate: Date;
  emergencyPhone: string;
  emergencyContact: string;
  selectedEvents: string[];
  totalFee: number;
  paymentStatus: PaymentStatus;
  registrationStatus: RegistrationStatus;
  needRfCard: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
} as const;

const RegistrationStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
} as const;
```

## 🔧 API 함수

이 레이어는 **Read(조회)** 작업만 담당합니다. 생성, 수정, 삭제는 [features/registration](../../features/registration/README.md)을 참고하세요.

### getRegistrationById

단일 등록 상세 조회

```typescript
import { getRegistrationById } from '@/entities/registration';

const registration = await getRegistrationById(123);
```

### getRegistrationsByUser

현재 유저의 등록 목록 조회 (페이지네이션)

```typescript
import { getRegistrationsByUser } from '@/entities/registration';

const myRegistrations = await getRegistrationsByUser({
  page: 0,
  size: 10,
});
```

### getRegistrationsByCompPending

대회별 Pending 상태 등록 목록 조회 (페이지네이션)

```typescript
import { getRegistrationsByCompPending } from '@/entities/registration';

const pendingRegistrations = await getRegistrationsByCompPending(123, {
  page: 0,
  size: 10,
});
```

### getRegistrationsByCompConfirmed

대회별 Confirmed 상태 등록 목록 조회 (페이지네이션)

```typescript
const confirmedRegistrations = await getRegistrationsByCompConfirmed(123, {
  page: 0,
  size: 10,
});
```

### getRegistrationsByCompCancelled

대회별 Cancelled 상태 등록 목록 조회 (페이지네이션)

```typescript
const cancelledRegistrations = await getRegistrationsByCompCancelled(123, {
  page: 0,
  size: 10,
});
```

## 📖 사용 예시

### 컴포넌트에서 사용

```typescript
import { getRegistrationById, getRegistrationsByUser } from '@/entities/registration';
import type { Registration, RegistrationDetailed } from '@/entities/registration';

const MyRegistrationsPage = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    loadMyRegistrations();
  }, []);
  
  const loadMyRegistrations = async () => {
    setLoading(true);
    try {
      const data = await getRegistrationsByUser({ page: 0, size: 10 });
      setRegistrations(data.content);
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
      <h2>내 참가 신청 목록</h2>
      {registrations.map(reg => (
        <div key={reg.id}>
          <h3>{reg.competitionName}</h3>
          <p>참가자: {reg.name} ({reg.enName})</p>
          <p>CCK ID: {reg.cckId}</p>
          <p>선택 종목: {reg.selectedEvents.join(', ')}</p>
          <p>총 참가비: {reg.totalFee.toLocaleString()}원</p>
          <p>결제 상태: {reg.paymentStatus}</p>
          <p>등록 상태: {reg.registrationStatus}</p>
        </div>
      ))}
    </div>
  );
};
```

## 🔄 DTO와 Model

### RegistrationDTO (백엔드 응답)

```typescript
interface RegistrationDTO {
  id: number;
  competitionId: number;
  competitionName: string;
  name: string;
  enName: string;
  cckId: string;
  selectedEvents: string[];
  totalFee: number;
  paymentStatus: string;      // "PENDING", "PAID", etc.
  registrationStatus: string; // "PENDING", "CONFIRMED", etc.
  needRfCard: boolean;
}
```

### Registration (프론트엔드 사용)

```typescript
interface Registration {
  id: number;
  competitionId: number;
  competitionName: string;
  name: string;
  enName: string;
  cckId: string;
  selectedEvents: string[];
  totalFee: number;
  paymentStatus: PaymentStatus;      // const object
  registrationStatus: RegistrationStatus; // const object
  needRfCard: boolean;
}
```

## 🔗 관련 기능

- **CUD 작업**: [features/registration](../../features/registration/README.md)
  - 등록 생성 (createRegistration)
  - 이벤트 수정 (updateRegistrationEvents)
  - 등록 승인 (approveRegistration)
  - 등록 취소 (cancelRegistration)
  - 등록 삭제 (deleteRegistration)
  - 환불 처리 (refundRegistration)
- **관련 엔티티**: [entities/competition](../competition/README.md)
- **상위 레이어**: [Entities Layer](../README.md)

## 📝 API 엔드포인트

| 함수 | HTTP | 엔드포인트 | 설명 |
|------|------|-----------|------|
| `getRegistrationById` | GET | `/registration/{id}` | 단일 등록 상세 조회 |
| `getRegistrationsByUser` | GET | `/registration/user` | 현재 유저의 등록 목록 |
| `getRegistrationsByCompPending` | GET | `/registration/comp/{compIdx}/pending` | 대회별 Pending 목록 |
| `getRegistrationsByCompConfirmed` | GET | `/registration/comp/{compIdx}/confirmed` | 대회별 Confirmed 목록 |
| `getRegistrationsByCompCancelled` | GET | `/registration/comp/{compIdx}/cancelled` | 대회별 Cancelled 목록 |

---

**주의**: 이 엔티티는 **Read(조회)만** 담당합니다. 등록 생성, 수정, 승인, 취소, 삭제, 환불 등의 작업은 [features/registration](../../features/registration/README.md)에서 수행됩니다.
