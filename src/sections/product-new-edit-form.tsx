import type { IProductItem } from 'src/types/product';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import {
  _tags,
  PRODUCT_SIZE_OPTIONS,
  PRODUCT_GENDER_OPTIONS,
  PRODUCT_COLOR_NAME_OPTIONS,
  PRODUCT_CATEGORY_GROUP_OPTIONS,
} from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  name: zod.string().min(1, { message: '이름은 필수 항목입니다!' }),
  description: schemaHelper
    .editor({ message: '설명은 필수 항목입니다!' })
    .min(100, { message: '설명은 최소 100자 이상이어야 합니다.' })
    .max(1000, { message: '설명은 1000자 이하여야 합니다.' }),
  images: schemaHelper.files({ message: '이미지는 필수 항목입니다!' }),
  code: zod.string().min(1, { message: '제품 코드는 필수 항목입니다!' }),
  sku: zod.string().min(1, { message: '제품 식별코드는 필수 항목입니다!' }),
  quantity: schemaHelper.nullableInput(
    zod.number({ coerce: true }).min(1, { message: '수량은 필수 항목입니다!' }),
    {
      // null 값에 대한 메시지
      message: '수량은 필수 항목입니다!',
    }
  ),
  colors: zod.string().array().min(1, { message: '최소 하나의 옵션을 선택해야 합니다!' }),
  sizes: zod.string().array().min(1, { message: '최소 하나의 옵션을 선택해야 합니다!' }),
  tags: zod.string().array().min(2, { message: '태그는 최소 2개 이상이어야 합니다!' }),
  gender: zod.array(zod.string()).min(1, { message: '최소 하나의 옵션을 선택해야 합니다!' }),
  price: schemaHelper.nullableInput(
    zod.number({ coerce: true }).min(1, { message: '가격은 필수 항목입니다!' }),
    {
      // null 값에 대한 메시지
      message: '가격은 필수 항목입니다!',
    }
  ),
// 필수 아님
  category: zod.string(),
  subDescription: zod.string(),
  taxes: zod.number({ coerce: true }).nullable(),
  priceSale: zod.number({ coerce: true }).nullable(),
  saleLabel: zod.object({ enabled: zod.boolean(), content: zod.string() }),
  newLabel: zod.object({ enabled: zod.boolean(), content: zod.string() }),
});

// ----------------------------------------------------------------------

type Props = {
  currentProduct?: IProductItem;
};

export function ProductNewEditForm({ currentProduct }: Props) {
  const router = useRouter();

  const [includeTaxes, setIncludeTaxes] = useState(false);

  const defaultValues: NewProductSchemaType = {
    name: '',
    description: '',
    subDescription: '',
    images: [],
    /********/
    code: '',
    sku: '',
    price: null,
    taxes: null,
    priceSale: null,
    quantity: null,
    tags: [],
    gender: [],
    category: PRODUCT_CATEGORY_GROUP_OPTIONS[0].classify[1],
    colors: [],
    sizes: [],
    newLabel: { enabled: false, content: '' },
    saleLabel: { enabled: false, content: '' },
  };

  const methods = useForm<NewProductSchemaType>({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
    values: currentProduct,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    const updatedData = {
      ...data,
      taxes: includeTaxes ? defaultValues.taxes : data.taxes,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentProduct ? '상품이 수정되었습니다.' : '상품이 등록되었습니다.');
      router.push(paths.product.root);
      console.info('DATA', updatedData);
    } catch (error) {
      console.error(error);
    }
  });

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', [], { shouldValidate: true });
  }, [setValue]);

  const handleChangeIncludeTaxes = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIncludeTaxes(event.target.checked);
  }, []);

  const renderDetails = () => (
    <Card>
      <CardHeader title="세부 정보" subheader="제목, 간단한 설명, 이미지..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="name" label="제품 이름" />

        <Field.Text name="subDescription" label="간단한 설명" multiline rows={4} />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">내용</Typography>
          <Field.Editor name="description" sx={{ maxHeight: 480 }} />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">이미지</Typography>
          <Field.Upload
            multiple
            thumbnail
            name="images"
            maxSize={3145728}
            onRemove={handleRemoveFile}
            onRemoveAll={handleRemoveAllFiles}
            onUpload={() => console.info('업로드 중')}
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderProperties = () => (
    <Card>
      <CardHeader
        title="속성"
        subheader="추가 기능과 속성..."
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Box
          sx={{
            rowGap: 3,
            columnGap: 2,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
          }}
        >
          <Field.Text name="code" label="제품 코드" />

          <Field.Text name="sku" label="제품 식별코드" />

          <Field.Text
            name="quantity"
            label="수량"
            placeholder="0"
            type="number"
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <Field.Select
            name="category"
            label="카테고리"
            slotProps={{
              select: { native: true },
              inputLabel: { shrink: true },
            }}
          >
            {PRODUCT_CATEGORY_GROUP_OPTIONS.map((category) => (
              <optgroup key={category.group} label={category.group}>
                {category.classify.map((classify) => (
                  <option key={classify} value={classify}>
                    {classify}
                  </option>
                ))}
              </optgroup>
            ))}
          </Field.Select>

          <Field.MultiSelect
            checkbox
            name="colors"
            label="색상"
            options={PRODUCT_COLOR_NAME_OPTIONS}
          />

          <Field.MultiSelect
            checkbox
            name="sizes"
            label="사이즈"
            options={PRODUCT_SIZE_OPTIONS}
          />
        </Box>

        <Field.Autocomplete
          name="tags"
          label="태그"
          placeholder="+ 태그"
          multiple
          freeSolo
          disableCloseOnSelect
          options={_tags.map((option) => option)}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        />

        <Stack spacing={1}>
          <Typography variant="subtitle2">성별</Typography>
          <Field.MultiCheckbox
            row
            name="gender"
            options={PRODUCT_GENDER_OPTIONS}
            sx={{ gap: 2 }}
          />
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ gap: 3, display: 'flex', alignItems: 'center' }}>
          <Field.Switch name="saleLabel.enabled" label={null} sx={{ m: 0 }} />
          <Field.Text
            name="saleLabel.content"
            label="세일 라벨"
            fullWidth
            disabled={!values.saleLabel.enabled}
          />
        </Box>

        <Box sx={{ gap: 3, display: 'flex', alignItems: 'center' }}>
          <Field.Switch name="newLabel.enabled" label={null} sx={{ m: 0 }} />
          <Field.Text
            name="newLabel.content"
            label="신규 라벨"
            fullWidth
            disabled={!values.newLabel.enabled}
          />
        </Box>
      </Stack>
    </Card>

  );

  const renderPricing = () => (
    <Card>
      <CardHeader title="가격 설정" subheader="가격과 관련된 입력 항목" sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="price"
          label="정가"
          placeholder="0.00"
          type="number"
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0.75 }}>
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    ₩
                  </Box>
                </InputAdornment>
              ),
            },
          }}
        />

        <Field.Text
          name="priceSale"
          label="할인 가격"
          placeholder="0.00"
          type="number"
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0.75 }}>
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    ₩
                  </Box>
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControlLabel
          control={
            <Switch id="toggle-taxes" checked={includeTaxes} onChange={handleChangeIncludeTaxes} />
          }
          label="세금 포함 여부"
        />

        {!includeTaxes && (
          <Field.Text
            name="taxes"
            label="세율 (%)"
            placeholder="0.00"
            type="number"
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                startAdornment: (
                  <InputAdornment position="start" sx={{ mr: 0.75 }}>
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      %
                    </Box>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      </Stack>
    </Card>

  );

  const renderActions = () => (
    <Box
      sx={{
        gap: 3,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <FormControlLabel
        label="게시"
        control={<Switch defaultChecked inputProps={{ id: 'publish-switch' }} />}
        sx={{ pl: 3, flexGrow: 1 }}
      />

      <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
        {!currentProduct ? '상품 등록' : '상품 수정'}
      </LoadingButton>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails()}
        {renderProperties()}
        {renderPricing()}
        {renderActions()}
      </Stack>
    </Form>
  );
}
