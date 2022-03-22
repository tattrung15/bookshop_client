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
  DEFAULT_PAGINATION_OPTION,
  TYPE_ALERT,
} from "@app/shared/constants/common";
import { ResponseResult } from "@core/services/http/http.service";
import PopupDialog from "@app/components/popup-dialog";
import ConfirmDialog from "@app/components/confirm-dialog";
import { Product } from "@app/models/product.model";
import ProductService, {
  ProductPaginationOption,
} from "@app/services/http/product.service";

function ProductImageManagement() {
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
  const [pagination, setPagination] = useState(() => {
    const options: ProductPaginationOption = {
      ...DEFAULT_PAGINATION_OPTION,
    };
    return options;
  });

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
    // const itemView: UpdateProductDto = {
    //   id: item.id,
    //   title: item.title,
    //   longDescription: item.longDescription,
    //   categoryId: item.category.id,
    //   price: item.price,
    //   author: item.author,
    //   currentNumber: item.currentNumber,
    //   numberOfPage: item.numberOfPage,
    //   quantityPurchased: item.quantityPurchased,
    //   createdAt: item.createdAt,
    //   updatedAt: item.updatedAt,
    // };
    // setIsView(true);
    // setIsEdit(false);
    // setRecordForAction(itemView);
    // setIsOpenPopup(true);
  };

  const openInPopup = (item: Product) => {
    // const itemEdit: UpdateProductDto = {
    //   id: item.id,
    //   title: item.title,
    //   longDescription: item.longDescription,
    //   categoryId: item.category.id,
    //   price: item.price,
    //   author: item.author,
    //   currentNumber: item.currentNumber,
    //   numberOfPage: item.numberOfPage,
    //   quantityPurchased: item.quantityPurchased,
    //   createdAt: item.createdAt,
    //   updatedAt: item.updatedAt,
    // };
    // setIsView(false);
    // setIsEdit(true);
    // setRecordForAction(itemEdit);
    // setIsOpenPopup(true);
  };

  const addOrEdit = (values: any, resetForm: () => void) => {
    // if (isEdit) {
    //   const editProductId = values.id;
    //   const editProductBody: Partial<UpdateProductDto> = {
    //     title: values.title,
    //     longDescription: values.longDescription,
    //     categoryId: values.categoryId,
    //     price: values.price,
    //     author: values.author,
    //     currentNumber: values.currentNumber,
    //     numberOfPage: values.numberOfPage,
    //   };
    //   subscribeOnce(
    //     ProductService.updateProduct(editProductId, editProductBody),
    //     () => {
    //       enqueueSnackbar("Update product successfully", {
    //         variant: TYPE_ALERT.SUCCESS,
    //       });
    //       resetForm();
    //       setIsOpenPopup(false);
    //       setRecordForAction(new Product(null));
    //       setForceUpdate();
    //     }
    //   );
    // } else {
    //   const newProduct: CreateProductDto = {
    //     title: values.title,
    //     longDescription: values.longDescription,
    //     price: values.price,
    //     author: values.author,
    //     currentNumber: values.currentNumber,
    //     numberOfPage: values.numberOfPage,
    //     categoryId: values.categoryId,
    //   };
    //   subscribeOnce(ProductService.createProduct(newProduct), () => {
    //     enqueueSnackbar("Create product successfully", {
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
    const newPagination: ProductPaginationOption = {
      ...pagination,
      page: newPage + 1,
    };
    setPagination(newPagination);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const newPagination: ProductPaginationOption = {
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
      const newPaginationOption: ProductPaginationOption = {
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
        Product Image Management
      </Typography>
      <Box style={{ display: "flex" }}>
        <Button variant="contained" color="primary" onClick={onAddProductClick}>
          Add product images
        </Button>
        <PopupDialog
          title="Product image form"
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
                <TableCell width="42%">Title</TableCell>
                <TableCell width="30%">Number Of Images</TableCell>
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
              {/* {!!products.length &&
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
                ))} */}
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
        title="Delete product images?"
        open={confirmDialogOpen}
        setOpen={setConfirmDialogOpen}
        onConfirm={handleDeleteProduct}
      >
        {recordForAction &&
          "Do you want to delete product images: " + recordForAction.name}
        ?
      </ConfirmDialog>
    </Container>
  );
}

export default ProductImageManagement;