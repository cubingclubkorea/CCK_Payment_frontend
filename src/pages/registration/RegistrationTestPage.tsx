import { useState } from "react";
import { Link } from "react-router-dom";
import {
  getRegistrationsByUser,
  getRegistrationsByCompPending,
  getRegistrationsByCompConfirmed,
  getRegistrationsByCompCancelled,
  getRegistrationById,
} from "@/entities";
import {
  createRegistration,
  updateRegistrationEvents,
  approveRegistration,
  cancelRegistration,
  refundRegistration,
  deleteRegistration,
  type RegistrationCreateDTO,
  type RegistrationUpdateEventsDTO,
} from "@/features";

export const RegistrationTestPage = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 입력 필드 상태
  const [registrationId, setRegistrationId] = useState<number>(1);
  const [compIdx, setCompIdx] = useState<number>(1);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);

  // 등록 생성 폼
  const [createForm, setCreateForm] = useState<RegistrationCreateDTO>({
    competitionId: 1,
    competitionName: "테스트 대회",
    phone: "010-1234-5678",
    wcaId: "",
    emergencyPhone: "010-9876-5432",
    emergencyContact: "홍길동",
    selectedEvents: ["3x3x3"],
  });

  // 이벤트 수정 폼
  const [updateForm, setUpdateForm] = useState<RegistrationUpdateEventsDTO>({
    registrationId: 1,
    selectedEvents: ["3x3x3", "4x4x4"],
  });

  const handleTest = async (apiFunction: () => Promise<any>, name: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFunction();
      setResult(data);
      console.log(`${name} 결과:`, data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "알 수 없는 에러";
      setError(errorMessage);
      console.error(`${name} 에러:`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          color: "#007bff",
          textDecoration: "none",
        }}
      >
        ← 대시보드로 돌아가기
      </Link>
      <h1>Registration API 테스트</h1>

      {/* 조회 API */}
      <section
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h2>📋 등록 조회</h2>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "10px" }}>
            Page:
            <input
              type="number"
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
              style={{ marginLeft: "5px", padding: "5px", width: "60px" }}
            />
          </label>
          <label>
            Size:
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              style={{ marginLeft: "5px", padding: "5px", width: "60px" }}
            />
          </label>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() =>
              handleTest(
                () => getRegistrationsByUser({ page, size }),
                "getRegistrationsByUser",
              )
            }
            disabled={loading}
            style={{
              padding: "10px 15px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            내 등록 목록
          </button>
        </div>

        <div style={{ marginTop: "15px" }}>
          <label style={{ marginRight: "10px" }}>
            대회 ID:
            <input
              type="number"
              value={compIdx}
              onChange={(e) => setCompIdx(Number(e.target.value))}
              style={{ marginLeft: "5px", padding: "5px", width: "80px" }}
            />
          </label>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "10px",
          }}
        >
          <button
            onClick={() =>
              handleTest(
                () => getRegistrationsByCompPending(compIdx, { page, size }),
                "getRegistrationsByCompPending",
              )
            }
            disabled={loading}
            style={{
              padding: "10px 15px",
              backgroundColor: "#ffc107",
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            대회별 Pending
          </button>
          <button
            onClick={() =>
              handleTest(
                () => getRegistrationsByCompConfirmed(compIdx, { page, size }),
                "getRegistrationsByCompConfirmed",
              )
            }
            disabled={loading}
            style={{
              padding: "10px 15px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            대회별 Confirmed
          </button>
          <button
            onClick={() =>
              handleTest(
                () => getRegistrationsByCompCancelled(compIdx, { page, size }),
                "getRegistrationsByCompCancelled",
              )
            }
            disabled={loading}
            style={{
              padding: "10px 15px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            대회별 Cancelled
          </button>
        </div>

        <div style={{ marginTop: "15px" }}>
          <label style={{ marginRight: "10px" }}>
            등록 ID:
            <input
              type="number"
              value={registrationId}
              onChange={(e) => setRegistrationId(Number(e.target.value))}
              style={{ marginLeft: "5px", padding: "5px", width: "80px" }}
            />
          </label>
          <button
            onClick={() =>
              handleTest(
                () => getRegistrationById(registrationId),
                "getRegistrationById",
              )
            }
            disabled={loading}
            style={{
              padding: "10px 15px",
              backgroundColor: "#17a2b8",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            등록 상세 조회
          </button>
        </div>
      </section>

      {/* 등록 생성 */}
      <section
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h2>➕ 등록 생성</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            marginBottom: "15px",
          }}
        >
          <input
            type="number"
            placeholder="대회 ID"
            value={createForm.competitionId}
            onChange={(e) =>
              setCreateForm({
                ...createForm,
                competitionId: Number(e.target.value),
              })
            }
            style={{ padding: "8px" }}
          />
          <input
            type="text"
            placeholder="대회 이름"
            value={createForm.competitionName}
            onChange={(e) =>
              setCreateForm({ ...createForm, competitionName: e.target.value })
            }
            style={{ padding: "8px" }}
          />
          <input
            type="text"
            placeholder="전화번호"
            value={createForm.phone}
            onChange={(e) =>
              setCreateForm({ ...createForm, phone: e.target.value })
            }
            style={{ padding: "8px" }}
          />
          <input
            type="text"
            placeholder="WCA ID (선택)"
            value={createForm.wcaId}
            onChange={(e) =>
              setCreateForm({ ...createForm, wcaId: e.target.value })
            }
            style={{ padding: "8px" }}
          />
          <input
            type="text"
            placeholder="비상 연락처"
            value={createForm.emergencyPhone}
            onChange={(e) =>
              setCreateForm({ ...createForm, emergencyPhone: e.target.value })
            }
            style={{ padding: "8px" }}
          />
          <input
            type="text"
            placeholder="비상 연락 대상"
            value={createForm.emergencyContact}
            onChange={(e) =>
              setCreateForm({ ...createForm, emergencyContact: e.target.value })
            }
            style={{ padding: "8px" }}
          />
          <input
            type="text"
            placeholder="이벤트 (쉼표로 구분)"
            value={createForm.selectedEvents.join(", ")}
            onChange={(e) =>
              setCreateForm({
                ...createForm,
                selectedEvents: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            style={{ padding: "8px", gridColumn: "1 / -1" }}
          />
        </div>
        <button
          onClick={() =>
            handleTest(
              () => createRegistration(createForm),
              "createRegistration",
            )
          }
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          등록 생성
        </button>
      </section>

      {/* 이벤트 수정 */}
      <section
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h2>✏️ 이벤트 수정</h2>
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <input
            type="number"
            placeholder="등록 ID"
            value={updateForm.registrationId}
            onChange={(e) =>
              setUpdateForm({
                ...updateForm,
                registrationId: Number(e.target.value),
              })
            }
            style={{ padding: "8px", width: "100px" }}
          />
          <input
            type="text"
            placeholder="이벤트 (쉼표로 구분)"
            value={updateForm.selectedEvents.join(", ")}
            onChange={(e) =>
              setUpdateForm({
                ...updateForm,
                selectedEvents: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            style={{ padding: "8px", flex: 1 }}
          />
        </div>
        <button
          onClick={() =>
            handleTest(
              () => updateRegistrationEvents(updateForm),
              "updateRegistrationEvents",
            )
          }
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ffc107",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          이벤트 수정
        </button>
      </section>

      {/* 상태 변경 */}
      <section
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h2>🔄 등록 상태 변경</h2>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "10px" }}>
            등록 ID:
            <input
              type="number"
              value={registrationId}
              onChange={(e) => setRegistrationId(Number(e.target.value))}
              style={{ marginLeft: "5px", padding: "5px", width: "80px" }}
            />
          </label>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() =>
              handleTest(
                () => approveRegistration(registrationId),
                "approveRegistration",
              )
            }
            disabled={loading}
            style={{
              padding: "10px 15px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            승인
          </button>
          <button
            onClick={() =>
              handleTest(
                () => cancelRegistration(registrationId),
                "cancelRegistration",
              )
            }
            disabled={loading}
            style={{
              padding: "10px 15px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            취소
          </button>
          <button
            onClick={() =>
              handleTest(
                () => refundRegistration(registrationId),
                "refundRegistration",
              )
            }
            disabled={loading}
            style={{
              padding: "10px 15px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            환불
          </button>
          <button
            onClick={() =>
              handleTest(
                () => deleteRegistration(registrationId),
                "deleteRegistration",
              )
            }
            disabled={loading}
            style={{
              padding: "10px 15px",
              backgroundColor: "#343a40",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            삭제
          </button>
        </div>
      </section>

      {/* 결과 표시 */}
      {loading && (
        <p style={{ color: "blue", fontSize: "18px" }}>⏳ 로딩 중...</p>
      )}
      {error && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          <strong>에러:</strong> {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>결과:</h3>
          <pre
            style={{
              background: "#f5f5f5",
              padding: "15px",
              borderRadius: "5px",
              overflow: "auto",
              maxHeight: "500px",
              border: "1px solid #ddd",
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
