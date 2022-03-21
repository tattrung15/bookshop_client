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
import { useStyles } from "./make-style";
import { useSnackbar } from "notistack";
import useForceUpdate from "@core/hooks/use-force-update.hook";
import useObservable from "@core/hooks/use-observable.hook";
import {
  DEFAULT_PAGINATION_OPTION,
  FETCH_TYPE,
  TYPE_ALERT,
} from "@app/shared/constants/common";
import { ResponseResult } from "@core/services/http/http.service";
import PopupDialog from "@app/components/popup-dialog";
import ConfirmDialog from "@app/components/confirm-dialog";
import { Product } from "@app/models/product.model";
import ProductService from "@app/services/http/product.service";

function ProductManagement() {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [forceUpdate, setForceUpdate] = useForceUpdate();
  const { subscribeOnce, subscribeUntilDestroy } = useObservable();

  const typingTimeoutRef = useRef<any>(null);

  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [recordForAction, setRecordForAction] = useState<any>(
    new Product(null)
  );
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION_OPTION);

  useEffect(() => {
    subscribeUntilDestroy(
      ProductService.getList(pagination),
      (response: ResponseResult) => {
        setProducts(response.data as Product[]);
        setTotal(response?.pagination?.total || 0);
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, forceUpdate]);

  const onAddProductClick = () => {
    setIsView(false);
    setIsEdit(false);
    setRecordForAction(new Product(null));
    setIsOpenPopup(true);
  };

  const openViewDialog = (item: Product) => {
    // const itemView: UpdateCategoryDto = {
    //   id: item.id,
    //   name: item.name,
    //   description: item.description ? item.description : "",
    //   isAuthor: item.isAuthor,
    //   parentCategoryId: item.parentCategory ? item.parentCategory.id : null,
    //   createdAt: item.createdAt,
    //   updatedAt: item.updatedAt,
    // };
    // setIsView(true);
    // setIsEdit(false);
    // setRecordForAction(itemView);
    // setIsOpenPopup(true);
  };

  const openInPopup = (item: Product) => {
    // const itemEdit: UpdateCategoryDto = {
    //   id: item.id,
    //   name: item.name,
    //   description: item.description ? item.description : "",
    //   isAuthor: item.isAuthor,
    //   parentCategoryId: item.parentCategory ? item.parentCategory.id : null,
    // };
    // setIsView(false);
    // setIsEdit(true);
    // setRecordForAction(itemEdit);
    // setIsOpenPopup(true);
  };

  const addOrEdit = (values: any, resetForm: () => void) => {
    // if (isEdit) {
    //   const editCategoryId = values.id;
    //   const editCategoryBody: Partial<UpdateCategoryDto> = {
    //     name: values.name,
    //     description: values.description ? values.description : "",
    //     isAuthor: values.isAuthor ? values.isAuthor : false,
    //     parentCategoryId: values.parentCategoryId,
    //   };
    //   subscribeOnce(
    //     CategoryService.updateCategory(editCategoryId, editCategoryBody),
    //     () => {
    //       enqueueSnackbar("Update category successfully", {
    //         variant: TYPE_ALERT.SUCCESS,
    //       });
    //       resetForm();
    //       setIsOpenPopup(false);
    //       setRecordForAction(new Category(null));
    //       setForceUpdate();
    //     }
    //   );
    // } else {
    //   const newCategory: CreateCategoryDto = {
    //     name: values.name,
    //     description: values.description ? values.description : null,
    //     isAuthor: values.isAuthor ? values.isAuthor : null,
    //     parentCategoryId: values.parentCategoryId,
    //   };
    //   Object.keys(newCategory).forEach(
    //     (key) => newCategory[key] === null && delete newCategory[key]
    //   );
    //   subscribeOnce(CategoryService.createCategory(newCategory), () => {
    //     enqueueSnackbar("Create category successfully", {
    //       variant: TYPE_ALERT.SUCCESS,
    //     });
    //     resetForm();
    //     setIsOpenPopup(false);
    //     setForceUpdate();
    //   });
    // }
  };

  const openConfirmDialog = (item: Product) => {
    setConfirmDialogOpen(true);
    setRecordForAction(item);
  };

  const handleDeleteProduct = () => {
    subscribeOnce(ProductService.deleteProduct(recordForAction.id), () => {
      enqueueSnackbar("Delete product successfully", {
        variant: TYPE_ALERT.SUCCESS,
      });
      setForceUpdate();
    });
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    // const newPagination: CategoryPaginationOption = {
    //   ...pagination,
    //   page: newPage + 1,
    // };
    // setPagination(newPagination);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    // const newPagination: CategoryPaginationOption = {
    //   ...pagination,
    //   page: 1,
    //   perPage: +event.target.value,
    // };
    // setPagination(newPagination);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const value = event.target.value;
    // setSearchState(value);
    // if (typingTimeoutRef.current) {
    //   clearTimeout(typingTimeoutRef.current);
    // }
    // typingTimeoutRef.current = setTimeout(() => {
    //   const newPaginationOption: CategoryPaginationOption = {
    //     ...pagination,
    //     like: {
    //       name: value,
    //     },
    //   };
    //   setPagination(newPaginationOption);
    // }, 500);
  };

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Typography variant="h4" className={classes.screenName}>
        Product Management
      </Typography>
      <Box style={{ display: "flex" }}>
        <Button variant="contained" color="primary" onClick={onAddProductClick}>
          Add product
        </Button>
        <PopupDialog
          title="Product form"
          openPopup={isOpenPopup}
          setOpenPopup={setIsOpenPopup}
        >
          {/* <ProductForm
            isEdit={isEdit}
            isView={isView}
            recordForAction={recordForAction}
            addOrEdit={addOrEdit}
            categories={allCategories}
          /> */}
        </PopupDialog>
        <TextField
          style={{ marginLeft: "1em" }}
          label="Search title..."
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
                <TableCell width="7%">STT</TableCell>
                <TableCell width="37%">Title</TableCell>
                <TableCell width="15%">Price</TableCell>
                <TableCell width="20%">Author</TableCell>
                <TableCell width="7%" align="center">
                  View
                </TableCell>
                <TableCell width="7%" align="center">
                  Edit
                </TableCell>
                <TableCell width="7%" align="center">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!products.length &&
                products.map((item: Product, index: number) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.price.toLocaleString("vn")} đ</TableCell>
                    <TableCell>{item.author}</TableCell>
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
        title="Delete User?"
        open={confirmDialogOpen}
        setOpen={setConfirmDialogOpen}
        onConfirm={handleDeleteProduct}
      >
        {recordForAction &&
          "Do you want to delete product: " + recordForAction.name}
        ?
      </ConfirmDialog>
    </Container>
  );
}

export default ProductManagement;
