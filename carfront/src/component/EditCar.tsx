import { useState } from "react";
import { CarResponse, Car, CarEntry } from "../types";
import { Button, Dialog, DialogActions, DialogTitle, Tooltip } from "@mui/material";
import CarDialogContent from "./CarDialogContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar } from "../api/carapi";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

// EditCar 컴포넌트가 받는 props의 타입 정의
// cardata: 수정할 자동차의 기존 데이터

type FormProps = {
    cardata: CarResponse;
}

// 자동차 정보를 수정할 수 있는 모달 다이얼로그를 제공하는 컴포넌트
function EditCar({ cardata }: FormProps) {
    const [open, setOpen] = useState(false);

    // 수정될 자동차 데이터를 관리하는 상태
    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0
    });

    // 다이얼로그를 열고 기존 자동차 데이터를 상태에 설정하는 함수
    const handleClickOpen = () => {
        setCar({
            brand: cardata.brand,
            model: cardata.model,
            color: cardata.color,
            registrationNumber: cardata.registrationNumber,
            modelYear: cardata.modelYear,
            price: cardata.price
        });
        setOpen(true);
    };

    // 다이얼로그를 닫는 함수
    const handleClose = () => {
        setOpen(false);
    };

    // 수정된 자동차 데이터를 저장하는 함수
    const handleSave = () => {
        const url = cardata._links.self.href;
        const CarEntry: CarEntry = { car, url };
        mutate(CarEntry); // 자동차 데이터를 업데이트 API에 전달

        // 자동차 상태를 초기화하고 다이얼로그 닫기
        setCar({ brand: '', model: '', color: '', registrationNumber: '', modelYear: 0, price: 0 });
        setOpen(false);
    }

    // 입력값 변경 시 자동차 상태 업데이트
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    }

    // 쿼리 클라이언트 객체를 가져옴
    const queryClient = useQueryClient();

    // 자동차 업데이트 API 호출을 위한 useMutation 훅 설정
    const { mutate } = useMutation(updateCar, {
        // 업데이트 성공 시 자동차 목록 데이터를 다시 가져옴
        onSuccess: () => {
            queryClient.invalidateQueries(["cars"]);
        },
        // 업데이트 실패 시 에러 출력
        onError: (err) => {
            console.error(err);
        }
    });

    return (
        <>
            {/* 자동차 수정 아이콘 버튼 */}
            <Tooltip title="Edit car">
                <IconButton aria-label="edit" size="small"
                    onClick={handleClickOpen}>
                    <EditIcon fontSize="small" />
                </IconButton>
            </Tooltip>

            {/* 자동차 수정 다이얼로그 */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>

                {/* 자동차 정보 입력 폼 */}
                <CarDialogContent car={car} handleChange={handleChange} />

                {/* 다이얼로그 액션 버튼들 */}
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditCar;