import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { Car } from '../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCar } from '../api/carapi';
import CarDialogContent from './CarDialogContent';
import { Button } from '@mui/material';

function AddCar(){

    // 자동차를 저장하고 모달 폼을 닫는 핸들러 함수
    const handleSave = () => {
        mutate(car); // 자동차 데이터를 서버에 추가 요청
        // 자동차 상태를 초기화
        setCar({brand:'', model:'', color:'', registrationNumber:'', modelYear:0, price:0});
        handleClose(); // 모달 폼 닫기
    }

    // react-query의 쿼리 클라이언트 객체를 가져옴
    const queryClient = useQueryClient();

    // 자동차 추가 API 호출을 위한 mutate 함수 정의
    const { mutate } = useMutation(addCar, {
        // API 호출 성공 시 자동차 목록 쿼리를 갱신하여 데이터를 새로 불러옴
        onSuccess: () => {
            queryClient.invalidateQueries(["cars"]);
        },
        // API 호출 실패 시 에러 메시지를 콘솔에 출력
        onError: (err) => {
            console.error(err);
        },
    });

    // 모달 폼의 열림 상태 관리
    const [open, setOpen] = useState(false);

    // 입력 폼의 자동차 데이터 상태 관리
    const [car, setCar] = useState<Car>({
        brand:'',
        model:'',
        color:'',
        registrationNumber:'',
        modelYear:0,
        price:0
    });

    // 모달 폼을 열기 위한 핸들러
    const handleClickOpen = () => {
        setOpen(true);
    };

    // 모달 폼을 닫기 위한 핸들러
    const handleClose = () => {
        setOpen(false);
    }

    // 입력 필드 값이 변경될 때마다 자동차 상태 업데이트
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    return(
        <>
            {/* 자동차 추가 모달을 열기 위한 버튼 */}
            <Button onClick={handleClickOpen}>New Car</Button>

            {/* 자동차 추가 모달 다이얼로그 */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New car</DialogTitle>

                {/* 입력 폼 컴포넌트, 현재 자동차 상태와 상태 변경 핸들러를 전달 */}
                <CarDialogContent car={car} handleChange={handleChange}/>

                {/* 다이얼로그 하단의 액션 버튼들 */}
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddCar;
