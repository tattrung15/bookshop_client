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
  PRODUCT_TYPE,
  TYPE_ALERT,
} from "@app/shared/constants/common";
import { ResponseResult } from "@core/services/http/http.service";
import PopupDialog from "@app/components/popup-dialog";
import ConfirmDialog from "@app/components/confirm-dialog";
import { Product } from "@app/models/product.model";
import ProductService, {
  ProductPaginationOption,
} from "@app/services/http/product.service";
import ProductImageForm from "@app/components/product-image-form";
import {
  CreateProductImageDto,
  UpdateProductImageDto,
} from "@app/models/product-image.model";
import ProductImageService from "@app/services/http/product-image.service";

function ProductImageManagement() {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [forceUpdate, setForceUpdate] = useForceUpdate();
  const { subscribeOnce, subscribeUntilDestroy } = useObservable();

  const typingTimeoutRef = useRef<any>(null);

  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [productNoImages, setProductNoImages] = useState<Product[]>([]);
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
        setTotal(response.pagination?.total || 0);
      }
    );

    const options: ProductPaginationOption = {
      ...DEFAULT_PAGINATION_OPTION,
      productType: PRODUCT_TYPE.NO_IMAGE_ALL,
    };

    subscribeUntilDestroy(
      ProductService.getList(options),
      (response: ResponseResult) => {
        setProductNoImages(response.data as Product[]);
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
    const itemView: Partial<UpdateProductImageDto> = {
      productId: item.id,
      productImages: item.productImages,
      title: item.title,
    };
    setIsView(true);
    setIsEdit(false);
    setRecordForAction(itemView);
    setIsOpenPopup(true);
  };

  const openInPopup = (item: Product) => {
    const itemEdit: Partial<UpdateProductImageDto> = {
      productId: item.id,
      productImages: item.productImages,
      title: item.title,
    };
    setIsView(false);
    setIsEdit(true);
    setRecordForAction(itemEdit);
    setIsOpenPopup(true);
  };

  const addOrEdit = (
    values: Partial<UpdateProductImageDto>,
    resetForm: () => void
  ) => {
    if (!values.files?.length) {
      enqueueSnackbar("Vui lòng tải lên tệp", {
        variant: TYPE_ALERT.WARNING,
      });
      return;
    }
    if (isEdit) {
      const editProductImage: CreateProductImageDto = {
        productId: values.productId ?? 0,
        files: values.files ?? [],
      };
      subscribeOnce(
        ProductImageService.createProductImages(editProductImage),
        () => {
          enqueueSnackbar("cập nhật hình ảnh sản phẩm thành công", {
            variant: TYPE_ALERT.SUCCESS,
          });
          resetForm();
          setIsOpenPopup(false);
          setRecordForAction(new Product(null));
          setForceUpdate();
        }
      );
    } else {
      const newProductImage: CreateProductImageDto = {
        productId: values.productId ?? 0,
        files: values.files ?? [],
      };
      subscribeOnce(
        ProductImageService.createProductImages(newProductImage),
        () => {
          enqueueSnackbar("Tạo hình ảnh sản phẩm thành công", {
            variant: TYPE_ALERT.SUCCESS,
          });
          resetForm();
          setIsOpenPopup(false);
          setForceUpdate();
        }
      );
    }
  };

  const openConfirmDialog = (item: Product) => {
    setConfirmDialogOpen(true);
    setRecordForAction(item);
  };

  const handleDeleteProductImages = () => {
    subscribeOnce(
      ProductImageService.deleteProductImages(recordForAction.id),
      () => {
        enqueueSnackbar("Xóa hình ảnh sản phẩm thành công", {
          variant: TYPE_ALERT.SUCCESS,
        });
        setForceUpdate();
      }
    );
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
        Quản lý hình ảnh sản phẩm
      </Typography>
      <Box style={{ display: "flex" }}>
        <Button variant="contained" color="primary" onClick={onAddProductClick}>
          Thêm hình ảnh sản phẩm
        </Button>
        <PopupDialog
          title="Biểu mẫu hình ảnh sản phẩm"
          openPopup={isOpenPopup}
          setOpenPopup={setIsOpenPopup}
        >
          <ProductImageForm
            isEdit={isEdit}
            isView={isView}
            recordForAction={recordForAction}
            addOrEdit={addOrEdit}
            productNoImages={productNoImages}
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
                <TableCell width="7%">STT</TableCell>
                <TableCell width="42%">Tiêu đề</TableCell>
                <TableCell width="30%">Số lượng ảnh</TableCell>
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
              {!!products.length &&
                products.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.productImages.length}</TableCell>
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
        title="Xóa hình ảnh sản phẩm?"
        open={confirmDialogOpen}
        setOpen={setConfirmDialogOpen}
        onConfirm={handleDeleteProductImages}
      >
        {recordForAction &&
          "Bạn có muốn xóa hình ảnh sản phẩm: " + recordForAction.title}
        ?
      </ConfirmDialog>
    </Container>
  );
}

export default ProductImageManagement;
