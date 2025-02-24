import { DataGrid, GridCellParams, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCars, deleteCar } from "../api/carapi";
import { useState } from 'react';
import { Button, Snackbar, Stack, Tooltip } from '@mui/material';
import AddCar from './AddCar';
import EditCar from './EditCar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Carlist 컴포넌트의 props 타입 정의 (로그아웃 함수 포함)
type CarlistProps = {
    logOut?: () => void;
}

// 자동차 목록을 보여주는 메인 컴포넌트
function Carlist({ logOut }: CarlistProps) {
    // Snackbar 알림창의 상태 관리 (자동차 삭제 시 알림)
    const [open, setOpen] = useState(false);

    // react-query의 QueryClient 객체를 가져옴
    const queryClient = useQueryClient();

    // DataGrid 컴포넌트의 열(Column) 정의
    const columns: GridColDef[] = [
        { field: 'brand', headerName: 'Brand', width: 200 },
        { field: 'model', headerName: 'Model', width: 200 },
        { field: 'color', headerName: 'Color', width: 200 },
        { field: 'registrationNumber', headerName: 'Reg.nr', width: 150 },
        { field: 'modelYear', headerName: 'Model Year', width: 150 },
        { field: 'price', headerName: 'Price', width: 150 },

        // 자동차 수정 컴포넌트 렌더링을 위한 열 정의
        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) =>
                <EditCar cardata={params.row} />
        },

        // 자동차 삭제 버튼을 위한 열 정의
        {
            field: 'delete',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <Tooltip title="Delete car">
                    <IconButton aria-label="delete" size="small"
                        onClick={() => {
                            // 삭제 확인 알림 표시 후 삭제 요청 실행
                            if (window.confirm(`Are you sure you want to delete ${params.row.brand} ${params.row.model}?`))
                                mutate(params.row._links.car.href);
                        }}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            ),
        }
    ];

    // 자동차 삭제를 위한 mutation 설정
    const { mutate } = useMutation(deleteCar, {
        // 삭제 성공 시 Snackbar 알림을 보여주고 자동차 목록 다시 가져오기
        onSuccess: () => {
            setOpen(true);
            queryClient.invalidateQueries({ queryKey: ['cars'] });
        },
        onError: (err) => {
            console.error(err);
        },
    });

    // 자동차 데이터를 가져오는 쿼리
    const { data, error, isSuccess } = useQuery({
        queryKey: ["cars"],
        queryFn: getCars
    });

    // 데이터 로딩 중일 때 표시
    if (!isSuccess) {
        return <span>Loading...</span>
    } else if (error) {
        // 데이터 가져오기 실패 시 에러 메시지 표시
        return <span>Error when fetching cars...</span>
    } else {
        // 정상적으로 데이터를 가져왔을 때 자동차 목록 표시
        return (
            <>
                {/* 자동차 추가 버튼 및 로그아웃 버튼 표시 */}
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <AddCar />
                    <Button onClick={logOut}>Log out</Button>
                </Stack>

                {/* 자동차 목록을 보여주는 데이터 그리드 */}
                <DataGrid
                    rows={data}
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    getRowId={row => row._links.self.href}
                    slots={{ toolbar: GridToolbar }} />

                {/* 자동차 삭제 성공 알림을 위한 Snackbar */}
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Car delete"
                />
            </>
        );
    }
}

export default Carlist;