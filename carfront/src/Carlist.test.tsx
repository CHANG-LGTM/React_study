import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Carlist from './component/Carlist';
import '@testing-library/jest-dom/vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

// react-query의 QueryClient 인스턴스 생성 및 기본 옵션 설정 (재시도 비활성화)
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

// 테스트 컴포넌트를 위한 wrapper 컴포넌트 정의
const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

// Carlist 컴포넌트 테스트 그룹
describe("Carlist tests", () => {
    // 컴포넌트 렌더링 여부 테스트
    test("component renders", () => {
        render(<Carlist />, { wrapper });
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    // 자동차 데이터가 성공적으로 가져오는지 테스트
    test("Cars are fetched", async () => {
        render(<Carlist />, { wrapper });

        // 데이터가 로드될 때까지 기다린 후 UI에 특정 요소가 나타나는지 확인
        await waitFor(() => screen.getByText(/New Car/i));
        expect(screen.getByText(/Ford/i)).toBeInTheDocument();
    });

    // 새 자동차 등록 모달 다이얼로그가 정상적으로 열리는지 테스트
    test("Open new car model", async () => {
        render(<Carlist />, { wrapper });

        // "New Car" 버튼이 나타날 때까지 기다린 후 클릭하여 모달 오픈 확인
        await waitFor(() => screen.getByText(/New Car/i));
        await userEvent.click(screen.getByText(/New Car/i));
        expect(screen.getByText(/Save/i)).toBeInTheDocument();
    });
});
