import React, { useEffect, useRef, useState } from "react";
import { switchMap } from "rxjs/operators";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  Visibility as VisibilityIcon,
  Create as CreateIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { useStyles } from "./make-style";
import useForceUpdate from "@core/hooks/use-force-update.hook";
import useObservable from "@core/hooks/use-observable.hook";
import {
  BANNER_TYPE,
  DEFAULT_PAGINATION_OPTION,
  TYPE_ALERT,
} from "@app/shared/constants/common";
import {
  PaginationOption,
  ResponseResult,
} from "@core/services/http/http.service";
import PopupDialog from "@app/components/popup-dialog";
import ConfirmDialog from "@app/components/confirm-dialog";
import {
  Banner,
  CreateBannerDto,
  UpdateBannerDto,
} from "@app/models/banner.model";
import BannerService, {
  BannerPaginationOption,
} from "@app/services/http/banner.service";
import BannerForm from "@app/components/banner-form";

function BannerManagement() {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [forceUpdate, setForceUpdate] = useForceUpdate();
  const { subscribeOnce, subscribeUntilDestroy } = useObservable();

  const typingTimeoutRef = useRef<any>(null);

  const [total, setTotal] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [recordForAction, setRecordForAction] = useState<any>(new Banner(null));
  const [pagination, setPagination] = useState(() => {
    const options: PaginationOption = {
      ...DEFAULT_PAGINATION_OPTION,
    };
    return options;
  });

  useEffect(() => {
    subscribeUntilDestroy(
      BannerService.getList(pagination),
      (response: ResponseResult) => {
        setBanners(response.data as Banner[]);
        setTotal(response.pagination?.total ?? 0);
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, forceUpdate]);

  const onAddBannerClick = () => {
    setIsView(false);
    setIsEdit(false);
    setRecordForAction(new Banner(null));
    setIsOpenPopup(true);
  };

  const onIsActiveSwitchChange = (item: Banner) => {
    subscribeOnce(BannerService.changeStatus(item.id, !item.isActive), () => {
      setForceUpdate();
    });
  };

  const openViewDialog = (item: Banner) => {
    const itemView: UpdateBannerDto = {
      bannerId: item.id,
      title: item.title,
      imageUrl: item.imageUrl ?? "",
      type: item.type,
    };
    setIsView(true);
    setIsEdit(false);
    setRecordForAction(itemView);
    setIsOpenPopup(true);
  };

  const openInPopup = (item: Banner) => {
    const itemEdit: UpdateBannerDto = {
      bannerId: item.id,
      title: item.title,
      imageUrl: item.imageUrl ?? "",
      type: item.type,
    };
    setIsView(false);
    setIsEdit(true);
    setRecordForAction(itemEdit);
    setIsOpenPopup(true);
  };

  const addOrEdit = (
    values: Partial<UpdateBannerDto>,
    resetForm: () => void
  ) => {
    if (isEdit) {
      const editBannerId = values.bannerId ?? 0;
      const editBannerBody: UpdateBannerDto = {
        bannerId: values.bannerId ?? 0,
        title: values.title ?? "",
        type: values.type ?? BANNER_TYPE.CATEGORY,
        imageUrl: "",
      };

      let updateBannerObs = BannerService.updateBanner(
        editBannerId,
        editBannerBody
      );
      if (values.files && values.files.length > 0) {
        const file = values.files[0];
        updateBannerObs = updateBannerObs.pipe(
          switchMap((banner: Banner) => {
            return BannerService.uploadBannerImage(banner.id, file);
          })
        );
      }
      subscribeOnce(updateBannerObs, () => {
        enqueueSnackbar("Cập nhật banner thành công", {
          variant: TYPE_ALERT.SUCCESS,
        });
        resetForm();
        setIsOpenPopup(false);
        setRecordForAction(new Banner(null));
        setForceUpdate();
      });
    } else {
      const newBanner: CreateBannerDto = {
        title: values.title ?? "",
        type: values.type ?? BANNER_TYPE.CATEGORY,
      };
      subscribeOnce(BannerService.createBanner(newBanner), () => {
        enqueueSnackbar("Tạo banner thành công", {
          variant: TYPE_ALERT.SUCCESS,
        });
        resetForm();
        setIsOpenPopup(false);
        setForceUpdate();
      });
    }
  };

  const openConfirmDialog = (item: Banner) => {
    setConfirmDialogOpen(true);
    setRecordForAction(item);
  };

  const handleDeleteBanner = () => {
    subscribeOnce(BannerService.deleteBanner(recordForAction.id), () => {
      enqueueSnackbar("Xóa banner thành công", {
        variant: TYPE_ALERT.SUCCESS,
      });
      setForceUpdate();
    });
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    const newPagination: BannerPaginationOption = {
      ...pagination,
      page: newPage + 1,
    };
    setPagination(newPagination);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newPagination: BannerPaginationOption = {
      ...pagination,
      page: 1,
      perPage: +event.target.value,
    };
    setPagination(newPagination);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchState(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const newPaginationOption: BannerPaginationOption = {
        ...pagination,
        like: {
          title: value,
        },
      };
      setPagination(newPaginationOption);
    }, 500);
  };

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Typography variant="h4" className={classes.screenName}>
        Quản lý banner
      </Typography>
      <Box style={{ display: "flex" }}>
        <Button variant="contained" color="primary" onClick={onAddBannerClick}>
          Thêm banner
        </Button>
        <PopupDialog
          title="Biểu mẫu banner"
          openPopup={isOpenPopup}
          setOpenPopup={setIsOpenPopup}
        >
          <BannerForm
            isEdit={isEdit}
            isView={isView}
            recordForAction={recordForAction}
            addOrEdit={addOrEdit}
          />
        </PopupDialog>
        <TextField
          style={{ marginLeft: "1em" }}
          label="Tìm kiếm theo tiêu đề"
          variant="outlined"
          size="small"
          value={searchState}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          onChange={handleSearchChange}
        />
      </Box>
      <Paper style={{ marginTop: 10 }}>
        <TableContainer style={{ maxHeight: 450 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell width="10%">STT</TableCell>
                <TableCell width="29%">Tiêu đề</TableCell>
                <TableCell width="20%">Số lượng ảnh</TableCell>
                <TableCell width="20%">Kích hoạt</TableCell>
                <TableCell width="7%" align="center">
                  Xem
                </TableCell>
                <TableCell width="7%" align="center">
                  Cập nhật
                </TableCell>
                <TableCell width="7%" align="center">
                  Xóa
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!banners.length &&
                banners.map((item, index) => (
                  <TableRow hover key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.imageUrl ? 1 : 0}</TableCell>
                    <TableCell>
                      <Switch
                        checked={item.isActive}
                        onChange={() => onIsActiveSwitchChange(item)}
                        color="primary"
                        name="isActive"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => openViewDialog(item)}>
                        <VisibilityIcon style={{ color: "black" }} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => openInPopup(item)}>
                        <CreateIcon style={{ color: "black" }} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => openConfirmDialog(item)}>
                        <DeleteIcon style={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={total}
          page={pagination.page - 1}
          rowsPerPage={pagination.perPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
      <ConfirmDialog
        title="Delete banner?"
        open={confirmDialogOpen}
        setOpen={setConfirmDialogOpen}
        onConfirm={handleDeleteBanner}
      >
        {recordForAction &&
          "Do you want to delete banner: " + recordForAction.title}
        ?
      </ConfirmDialog>
    </Container>
  );
}

export default BannerManagement;
