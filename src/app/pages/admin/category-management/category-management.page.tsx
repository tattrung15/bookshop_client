import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
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
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@app/models/category.model";
import {
  DEFAULT_PAGINATION_OPTION,
  FETCH_TYPE,
  TYPE_ALERT,
} from "@app/shared/constants/common";
import CategoryService, {
  CategoryPaginationOption,
} from "@app/services/http/category.service";
import { ResponseResult } from "@core/services/http/http.service";
import PopupDialog from "@app/components/popup-dialog";
import ConfirmDialog from "@app/components/confirm-dialog";
import CategoryForm from "@app/components/category-form";

function CategoryManagement() {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [forceUpdate, setForceUpdate] = useForceUpdate();
  const { subscribeOnce, subscribeUntilDestroy } = useObservable();

  const typingTimeoutRef = useRef<any>(null);

  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [recordForAction, setRecordForAction] = useState<any>(
    new Category(null)
  );
  const [pagination, setPagination] = useState(() => {
    const options: CategoryPaginationOption = {
      ...DEFAULT_PAGINATION_OPTION,
      fetchType: FETCH_TYPE.ADMIN,
    };
    return options;
  });

  useEffect(() => {
    subscribeUntilDestroy(
      CategoryService.getList(pagination),
      (response: ResponseResult) => {
        setCategories(response.data as Category[]);
        setTotal(response.pagination?.total || 0);
      }
    );

    const options: CategoryPaginationOption = {
      ...DEFAULT_PAGINATION_OPTION,
      fetchType: FETCH_TYPE.ALL,
    };
    subscribeUntilDestroy(
      CategoryService.getList(options),
      (response: ResponseResult) => {
        setAllCategories(response.data as Category[]);
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, forceUpdate]);

  const onAddCategoryClick = () => {
    setIsView(false);
    setIsEdit(false);
    setRecordForAction(new Category(null));
    setIsOpenPopup(true);
  };

  const openViewDialog = (item: Category) => {
    const itemView: UpdateCategoryDto = {
      id: item.id,
      name: item.name,
      description: item.description ? item.description : "",
      isAuthor: item.isAuthor,
      parentCategoryId: item.parentCategory ? item.parentCategory.id : null,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
    setIsView(true);
    setIsEdit(false);
    setRecordForAction(itemView);
    setIsOpenPopup(true);
  };

  const openInPopup = (item: Category) => {
    const itemEdit: UpdateCategoryDto = {
      id: item.id,
      name: item.name,
      description: item.description ? item.description : "",
      isAuthor: item.isAuthor,
      parentCategoryId: item.parentCategory ? item.parentCategory.id : null,
    };
    setIsView(false);
    setIsEdit(true);
    setRecordForAction(itemEdit);
    setIsOpenPopup(true);
  };

  const addOrEdit = (values: UpdateCategoryDto, resetForm: () => void) => {
    if (isEdit) {
      const editCategoryId = values.id;
      const editCategoryBody: Partial<UpdateCategoryDto> = {
        name: values.name,
        description: values.description ? values.description : "",
        isAuthor: values.isAuthor ? values.isAuthor : false,
        parentCategoryId: values.parentCategoryId,
      };
      subscribeOnce(
        CategoryService.updateCategory(editCategoryId, editCategoryBody),
        () => {
          enqueueSnackbar("Cập nhật danh mục thành công", {
            variant: TYPE_ALERT.SUCCESS,
          });
          resetForm();
          setIsOpenPopup(false);
          setRecordForAction(new Category(null));
          setForceUpdate();
        }
      );
    } else {
      const newCategory: CreateCategoryDto = {
        name: values.name,
        description: values.description ? values.description : null,
        isAuthor: values.isAuthor ? values.isAuthor : null,
        parentCategoryId: values.parentCategoryId,
      };
      Object.keys(newCategory).forEach(
        (key) => newCategory[key] === null && delete newCategory[key]
      );
      subscribeOnce(CategoryService.createCategory(newCategory), () => {
        enqueueSnackbar("Tạo danh mục thành công", {
          variant: TYPE_ALERT.SUCCESS,
        });
        resetForm();
        setIsOpenPopup(false);
        setForceUpdate();
      });
    }
  };

  const openConfirmDialog = (item: Category) => {
    setConfirmDialogOpen(true);
    setRecordForAction(item);
  };

  const handleDeleteCategory = () => {
    subscribeOnce(CategoryService.deleteCategory(recordForAction.id), () => {
      enqueueSnackbar("Xóa danh mục thành công", {
        variant: TYPE_ALERT.SUCCESS,
      });
      setForceUpdate();
    });
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    const newPagination: CategoryPaginationOption = {
      ...pagination,
      page: newPage + 1,
    };
    setPagination(newPagination);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newPagination: CategoryPaginationOption = {
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
      const newPaginationOption: CategoryPaginationOption = {
        ...pagination,
        like: {
          name: value,
        },
      };
      setPagination(newPaginationOption);
    }, 500);
  };

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Typography variant="h4" className={classes.screenName}>
        Quản lý danh mục
      </Typography>
      <Box style={{ display: "flex" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onAddCategoryClick}
        >
          Thêm danh mục
        </Button>
        <PopupDialog
          title="Biểu mẫu danh mục"
          openPopup={isOpenPopup}
          setOpenPopup={setIsOpenPopup}
        >
          <CategoryForm
            isEdit={isEdit}
            isView={isView}
            recordForAction={recordForAction}
            addOrEdit={addOrEdit}
            categories={allCategories}
          />
        </PopupDialog>
        <TextField
          style={{ marginLeft: "1em" }}
          label="Tìm kiếm theo tên"
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
                <TableCell width="20%">Tên</TableCell>
                <TableCell width="29%">Mô tả</TableCell>
                <TableCell width="20%">Danh mục cha</TableCell>
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
              {!!categories.length &&
                categories.map((item, index) => (
                  <TableRow hover key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {item.description?.substring(0, 90)}
                      {item.description &&
                        item.description.length > 90 &&
                        "..."}
                    </TableCell>
                    <TableCell>{item.parentCategory?.name}</TableCell>
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
        title="Xóa danh mục?"
        open={confirmDialogOpen}
        setOpen={setConfirmDialogOpen}
        onConfirm={handleDeleteCategory}
      >
        {recordForAction && "Bạn có muốn xóa danh mục: " + recordForAction.name}
        ?
      </ConfirmDialog>
    </Container>
  );
}

export default CategoryManagement;
