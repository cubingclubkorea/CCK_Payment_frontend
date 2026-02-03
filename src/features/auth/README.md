# Auth Feature

**인증 피처** - 로그인, 로그아웃, 토큰 관리

## 🔧 API 함수

### getToken

OAuth 인증 코드로 토큰 발급

```typescript
import { getToken } from '@/features/auth';

const tokenResponse = await getToken('authorization_code_from_sso');

// 결과
{
  access_token: 'eyJhbGciOiJIUzI1NiIs...',
  token_type: 'Bearer',
  expires_in: 3600,
  scope: 'read write'
}
```

### refreshAccessToken

만료된 Access Token 갱신
- CSRF 토큰을 받아서 요청
- 401 에러 발생 시 자동으로 토큰 갱신 후 재시도

```typescript
import { refreshAccessToken } from '@/features/auth';

const newToken = await refreshAccessToken();
```

### logout

로그아웃
- CSRF 토큰을 받아서 요청
- Access Token이 만료된 경우 자동으로 갱신 후 로그아웃
- 로그아웃 성공 시 localStorage의 토큰 제거

```typescript
import { logout } from '@/features/auth';

await logout();
// localStorage의 토큰 자동 삭제
```

### getCsrfToken

CSRF 토큰 가져오기 (refresh, logout 등에서 내부적으로 사용)

```typescript
import { getCsrfToken } from '@/features/auth';

const csrfToken = await getCsrfToken();
```

## 📖 인증 플로우

### 1. 로그인

```
사용자 → 로그인 버튼 클릭
      ↓
프론트엔드 → SSO 서버로 리다이렉트 (LOGIN_URL)
      ↓
SSO → 사용자 인증
      ↓
SSO → /auth/confirm?code={code}로 리다이렉트
      ↓
프론트엔드 → getToken(code) 호출
      ↓
프론트엔드 → access_token을 localStorage에 저장
      ↓
프론트엔드 → 메인 페이지로 이동
```

### 2. API 호출

```
프론트엔드 → API 요청
      ↓
Axios 인터셉터 → Authorization 헤더에 토큰 자동 추가
      ↓
백엔드 → 토큰 검증
      ↓
백엔드 → 응답
```

### 3. 토큰 갱신

```
프론트엔드 → API 요청
      ↓
백엔드 → 401 Unauthorized
      ↓
Axios 인터셉터 → 토큰 삭제, localStorage에서 제거
      ↓
프론트엔드 → refresh() 호출 (필요시)
```

## 📖 사용 예시

### 인증 확인 페이지 (ConfirmPage)

```typescript
import { getToken } from '@/features/auth';
import { setAccessToken } from '@/features/auth/utils/tokenStorage';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ConfirmPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleConfirm();
  }, []);

  const handleConfirm = async () => {
    const code = searchParams.get('code');
    
    if (!code) {
      setError('인증 코드가 없습니다.');
      setLoading(false);
      return;
    }

    try {
      const tokenResponse = await getToken(code);
      setAccessToken(tokenResponse.access_token);
      navigate('/dashboard'); // 인증 성공 후 대시보드로 이동
    } catch (err) {
      setError(err instanceof Error ? err.message : '인증 실패');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>인증 처리 중...</div>;
  if (error) return <div>에러: {error}</div>;
  
  return null;
};
```

### 로그아웃 페이지

```typescript
import { logout } from '@/features/auth';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // 로그아웃 후 홈으로
    } catch (err) {
      console.error('로그아웃 실패:', err);
      // 에러가 발생해도 토큰은 이미 삭제됨
      navigate('/');
    }
  };

  return <div>로그아웃 처리 중...</div>;
};
```

## 🔐 토큰 관리

### 토큰 저장

```typescript
import { setAccessToken } from '@/features/auth/utils/tokenStorage';

// 토큰 저장
setAccessToken('eyJhbGciOiJIUzI1NiIs...');
// → localStorage.setItem('access_token', token)
```

### 토큰 가져오기

```typescript
import { getAccessToken } from '@/features/auth/utils/tokenStorage';

const token = getAccessToken();
// → localStorage.getItem('access_token')
```

### 토큰 삭제

```typescript
import { removeAccessToken } from '@/features/auth/utils/tokenStorage';

removeAccessToken();
// → localStorage.removeItem('access_token')
```

### 토큰 자동 추가

axios 인터셉터가 자동으로 처리:

```typescript
// 모든 API 요청에 자동으로 추가됨
headers: {
  'Authorization': 'Bearer {access_token}'
}
```

## 🚨 CSRF 보호

로그아웃과 토큰 갱신 시 CSRF 토큰 사용:

```typescript
// 1. CSRF 토큰 가져오기
const csrfToken = await getCsrfToken();

// 2. POST 요청 시 포함
await apiClient.post('/auth/logout', {}, {
  headers: {
    'X-XSRF-TOKEN': csrfToken,
  },
});
```

## 🔄 자동 토큰 갱신

401 Unauthorized 응답 시 자동으로 토큰 갱신:

```typescript
// refreshTokenOnUnauthorized 함수가 자동으로 처리
export const refreshTokenOnUnauthorized = async <T>(
  apiCall: () => Promise<T>
): Promise<T> => {
  try {
    return await apiCall();
  } catch (error: any) {
    // 401 에러가 아니면 그대로 throw
    if (error.response?.status !== 401) {
      throw error;
    }

    // 이미 refresh 중이면 대기
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshSubscribers.push((token: string) => {
          resolve(apiCall());
        });
      });
    }

    // 토큰 갱신 시작
    isRefreshing = true;
    
    try {
      const newToken = await refreshAccessToken();
      
      // 대기중인 요청들에게 새 토큰 전달
      refreshSubscribers.forEach(callback => callback(newToken.access_token));
      refreshSubscribers = [];
      
      // 원래 요청 재시도
      return await apiCall();
    } finally {
      isRefreshing = false;
    }
  }
};
```

## 🔗 관련 문서

- [Shared API 가이드](../../shared/api/README.md) - ApiClient, Axios 인터셉터
- [Features Layer](../README.md)

## 📝 API 엔드포인트

| 함수 | HTTP | 엔드포인트 | 설명 |
|------|------|-----------|------|
| `getToken` | POST | `/auth/token?code={code}` | 토큰 발급 |
| `refreshAccessToken` | POST | `/auth/refresh` | 토큰 갱신 (CSRF 필요) |
| `logout` | POST | `/auth/logout` | 로그아웃 (CSRF 필요) |
| `getCsrfToken` | GET | `/auth/csrf` | CSRF 토큰 조회 |

---

**주의**: 이 피처는 인증 관련 **CUD 작업**을 담당합니다. Read 작업은 없습니다.
