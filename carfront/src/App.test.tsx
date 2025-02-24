import { render,screen } from '@testing-library/react';
import{describe, expect, test} from 'vitest';
import App from './App';
import '@testing-library/jest-dom/vitest';

describe ("App tests",()=>{
    test("component renders",()=>{
        //테스트 케이스 코드
        render(<App/>)
        expect(screen.getByText(/Car Shop/i
            
        )).toBeInTheDocument();
    })
})