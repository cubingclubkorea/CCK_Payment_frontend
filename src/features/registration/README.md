# Registration Feature

**등록 피처** - 대회 참가 등록 생성, 수정, 승인, 취소, 삭제, 환불

## 🔧 API 함수

이 피처는 **CUD(생성, 수정, 삭제)** 작업을 담당합니다. 조회(Read)는 [entities/registration](../../entities/registration/README.md)을 참고하세요.

### createRegistration

새로운 참가 등록 생성

```typescript
import { createRegistration } from '@/features/registration';
import type { RegistrationCreateDTO } from '@/features/registration';

const dto: RegistrationCreateDTO = {
  competitionId: 1,
  competitionName: "2026 서울 큐브 대회",
  phone: "010-1234-5678",
  wcaId: "2024HONG01",
  emergencyPhone: "010-9876-5432",
  emergencyContact: "홍엄마",
  selectedEvents: ["333", "222", "444"],
};

await createRegistration(dto);
```

### updateRegistrationEvents

등록의 선택 종목 수정

```typescript
import { updateRegistrationEvents } from '@/features/registration';
import type { RegistrationUpdateEventsDTO } from '@/features/registration';

const dto: RegistrationUpdateEventsDTO = {
  registrationId: 123,
  selectedEvents: ["333", "222", "444", "555"],
};

await updateRegistrationEvents(dto);
```

### approveRegistration

등록 승인 (관리자 기능)

```typescript
import { approveRegistration } from '@/features/registration';

await approveRegistration(123);
// 등록 상태: PENDING → CONFIRMED
```

### cancelRegistration

등록 취소

```typescript
import { cancelRegistration } from '@/features/registration';

await cancelRegistration(123);
// 등록 상태: PENDING/CONFIRMED → CANCELLED
```

### deleteRegistration

등록 삭제

```typescript
import { deleteRegistration } from '@/features/registration';

await deleteRegistration(123);
// 등록 데이터 완전 삭제
```

### refundRegistration

결제 환불 처리

```typescript
import { refundRegistration } from '@/features/registration';

await refundRegistration(123);
// 결제 상태: PAID → REFUNDED
```

## 📖 사용 예시

### 등록 생성 컴포넌트

```typescript
import { createRegistration } from '@/features/registration';
import type { RegistrationCreateDTO } from '@/features/registration';
import { useNavigate } from 'react-router-dom';

const RegistrationCreatePage = ({ competitionId }: { competitionId: number }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    phone: '',
    wcaId: '',
    emergencyPhone: '',
    emergencyContact: '',
    selectedEvents: [] as string[],
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const dto: RegistrationCreateDTO = {
        competitionId,
        competitionName: "2026 서울 큐브 대회", // 실제로는 대회 정보에서 가져옴
        ...formData,
      };
      
      await createRegistration(dto);
      alert('참가 신청이 완료되었습니다!');
      navigate('/my-registrations');
    } catch (err) {
      setError(err instanceof Error ? err.message : '등록 실패');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        placeholder="전화번호"
        required
      />
      <input
        type="text"
        value={formData.wcaId}
        onChange={(e) => setFormData({ ...formData, wcaId: e.target.value })}
        placeholder="WCA ID (선택)"
      />
      {/* 종목 선택, 비상연락처 등 */}
      
      <button type="submit" disabled={loading}>
        {loading ? '처리중...' : '신청하기'}
      </button>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};
```

### 등록 관리 (승인/취소/환불)

```typescript
import {
  approveRegistration,
  cancelRegistration,
  refundRegistration,
  deleteRegistration
} from '@/features/registration';

const RegistrationManagementPage = ({ registration }: { registration: Registration }) => {
  const [loading, setLoading] = useState(false);
  
  const handleApprove = async () => {
    if (!confirm('이 등록을 승인하시겠습니까?')) return;
    
    setLoading(true);
    try {
      await approveRegistration(registration.id);
      alert('승인되었습니다.');
      // 목록 새로고침
    } catch (err) {
      alert('승인 실패: ' + (err instanceof Error ? err.message : '알 수 없는 오류'));
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = async () => {
    if (!confirm('이 등록을 취소하시겠습니까?')) return;
    
    setLoading(true);
    try {
      await cancelRegistration(registration.id);
      alert('취소되었습니다.');
    } catch (err) {
      alert('취소 실패');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRefund = async () => {
    if (!confirm('결제를 환불하시겠습니까?')) return;
    
    setLoading(true);
    try {
      await refundRegistration(registration.id);
      alert('환불 처리되었습니다.');
    } catch (err) {
      alert('환불 실패');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!confirm('이 등록을 완전히 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return;
    
    setLoading(true);
    try {
      await deleteRegistration(registration.id);
      alert('삭제되었습니다.');
      // 목록으로 이동
    } catch (err) {
      alert('삭제 실패');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h2>{registration.competitionName} 등록 관리</h2>
      <p>참가자: {registration.name}</p>
      <p>상태: {registration.registrationStatus}</p>
      <p>결제 상태: {registration.paymentStatus}</p>
      
      <div>
        {registration.registrationStatus === 'PENDING' && (
          <button onClick={handleApprove} disabled={loading}>승인</button>
        )}
        
        {registration.registrationStatus !== 'CANCELLED' && (
          <button onClick={handleCancel} disabled={loading}>취소</button>
        )}
        
        {registration.paymentStatus === 'PAID' && (
          <button onClick={handleRefund} disabled={loading}>환불</button>
        )}
        
        <button onClick={handleDelete} disabled={loading} style={{ color: 'red' }}>
          삭제
        </button>
      </div>
    </div>
  );
};
```

## 🔄 DTO 구조

### RegistrationCreateDTO

```typescript
interface RegistrationCreateDTO {
  competitionId: number;
  competitionName: string;
  phone: string;
  wcaId: string;
  emergencyPhone: string;
  emergencyContact: string;
  selectedEvents: string[];
}
```

### RegistrationUpdateEventsDTO

```typescript
interface RegistrationUpdateEventsDTO {
  registrationId: number;
  selectedEvents: string[];
}
```

## 🔗 관련 문서

- **조회 API**: [entities/registration](../../entities/registration/README.md)
- **Features Layer**: [../README.md](../README.md)

## 📝 API 엔드포인트

| 함수 | HTTP | 엔드포인트 | 설명 |
|------|------|-----------|------|
| `createRegistration` | POST | `/registration` | 등록 생성 |
| `updateRegistrationEvents` | PATCH | `/registration/events` | 종목 수정 |
| `approveRegistration` | PATCH | `/registration/{id}/approve` | 등록 승인 |
| `cancelRegistration` | PATCH | `/registration/{id}/cancel` | 등록 취소 |
| `deleteRegistration` | DELETE | `/registration/{id}` | 등록 삭제 |
| `refundRegistration` | PATCH | `/registration/{id}/refund` | 환불 처리 |

---

**주의**: 이 피처는 등록 관련 **CUD 작업**을 담당합니다. 조회(Read)는 [entities/registration](../../entities/registration/README.md)에서 수행됩니다.
