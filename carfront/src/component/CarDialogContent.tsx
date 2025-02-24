import { Stack, TextField } from '@mui/material';
import { Car } from '../types';
import DialogContent from '@mui/material/DialogContent';

// CarDialogContent 컴포넌트에 전달될 props의 타입 정의
// car: 자동차 데이터 객체
// handleChange: 입력 필드 값 변경 시 호출되는 함수

type DialogFormProps = {
    car: Car;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// 자동차 정보 입력 폼을 담고 있는 DialogContent 컴포넌트
function CarDialogContent({ car, handleChange }: DialogFormProps) {
    return (
        <DialogContent>
            <Stack spacing={2} mt={1}>
                {/* 브랜드 입력 필드 */}
                <TextField
                    label='Brand'
                    name='brand'
                    value={car.brand}
                    onChange={handleChange}
                /><br />

                {/* 모델 입력 필드 */}
                <TextField
                    label='Model'
                    name='model'
                    value={car.model}
                    onChange={handleChange}
                /><br />

                {/* 색상 입력 필드 */}
                <TextField
                    label='Color'
                    name='color'
                    value={car.color}
                    onChange={handleChange}
                /><br />

                {/* 연식 입력 필드 */}
                <TextField
                    label='Year'
                    name='modelYear'
                    value={car.modelYear}
                    onChange={handleChange}
                /><br />

                {/* 등록 번호 입력 필드 */}
                <TextField
                    label='Reg.nr'
                    name='registrationNumber'
                    value={car.registrationNumber}
                    onChange={handleChange}
                /><br />

                {/* 가격 입력 필드 */}
                <TextField
                    label='Price'
                    name='price'
                    value={car.price}
                    onChange={handleChange}
                /><br />
            </Stack>
        </DialogContent>
    );
}

export default CarDialogContent;
