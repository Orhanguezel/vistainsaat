// =============================================================
// FILE: src/integrations/rtk/endpoints/admin/categories_admin.endpoints.ts
// Ensotek – Admin Kategori RTK Endpoints
// Base URL: /api/admin (baseApi üzerinden)
// =============================================================

import { baseApi } from '@/integrations/baseApi';
import type {
  CategoryDto,
  CategoryListQueryParams,
  CategoryCreatePayload,
  CategoryUpdatePayload,
  CategoryReorderPayload,
  CategorySetImagePayload,
} from '@/integrations/shared';

/**
 * Query paramlarından undefined / boş stringleri temizlemek için
 */
const cleanParams = (
  params?: Record<string, unknown>,
): Record<string, string | number | boolean> | undefined => {
  if (!params) return undefined;
  const out: Record<string, string | number | boolean> = {};

  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === '' || (typeof v === 'number' && Number.isNaN(v))) {
      continue;
    }

    if (typeof v === 'boolean' || typeof v === 'number' || typeof v === 'string') {
      out[k] = v;
    } else {
      out[k] = String(v);
    }
  }

  return Object.keys(out).length ? out : undefined;
};

export const categoriesAdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /* --------------------------------------------------------- */
    /* LIST – GET /api/admin/categories/list                     */
    /* --------------------------------------------------------- */
    listCategoriesAdmin: build.query<CategoryDto[], CategoryListQueryParams | void>({
      query: (params) => ({
        url: '/admin/categories/list',
        method: 'GET',
        params: cleanParams(params as Record<string, unknown> | undefined),
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((c) => ({ type: 'Category' as const, id: c.id })),
              { type: 'Category' as const, id: 'LIST' },
            ]
          : [{ type: 'Category' as const, id: 'LIST' }],
    }),

    /* --------------------------------------------------------- */
    /* GET by id – /api/admin/categories/:id?locale=xx           */
    /* --------------------------------------------------------- */
    getCategoryAdmin: build.query<CategoryDto, { id: string; locale?: string }>({
      query: ({ id, locale }) => ({
        url: `/admin/categories/${encodeURIComponent(id)}`,
        method: 'GET',
        params: cleanParams(locale ? { locale } : undefined),
      }),
      providesTags: (_result, _error, { id }) => [{ type: 'Category' as const, id }],
    }),

    /* --------------------------------------------------------- */
    /* CREATE – POST /api/admin/categories                       */
    /* --------------------------------------------------------- */
    createCategoryAdmin: build.mutation<CategoryDto, CategoryCreatePayload>({
      query: (body) => ({
        url: '/admin/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),

    /* --------------------------------------------------------- */
    /* PATCH – /api/admin/categories/:id                         */
    /* --------------------------------------------------------- */
    updateCategoryAdmin: build.mutation<CategoryDto, { id: string; patch: CategoryUpdatePayload }>({
      query: ({ id, patch }) => ({
        url: `/admin/categories/${encodeURIComponent(id)}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Category', id },
        { type: 'Category', id: 'LIST' },
      ],
    }),

    /* --------------------------------------------------------- */
    /* DELETE – /api/admin/categories/:id                        */
    /* --------------------------------------------------------- */
    deleteCategoryAdmin: build.mutation<void, string>({
      query: (id) => ({
        url: `/admin/categories/${encodeURIComponent(id)}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Category', id },
        { type: 'Category', id: 'LIST' },
      ],
    }),

    /* --------------------------------------------------------- */
    /* REORDER – /api/admin/categories/reorder                   */
    /* --------------------------------------------------------- */
    reorderCategoriesAdmin: build.mutation<{ ok: boolean }, CategoryReorderPayload>({
      query: (payload) => ({
        url: '/admin/categories/reorder',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),

    /* --------------------------------------------------------- */
    /* TOGGLE ACTIVE – PATCH /api/admin/categories/:id/active    */
    /* --------------------------------------------------------- */
    toggleCategoryActiveAdmin: build.mutation<CategoryDto, { id: string; is_active: boolean }>({
      query: ({ id, is_active }) => ({
        url: `/admin/categories/${encodeURIComponent(id)}/active`,
        method: 'PATCH',
        body: { is_active },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Category', id },
        { type: 'Category', id: 'LIST' },
      ],
    }),

    /* --------------------------------------------------------- */
    /* TOGGLE FEATURED – PATCH /api/admin/categories/:id/featured*/
    /* --------------------------------------------------------- */
    toggleCategoryFeaturedAdmin: build.mutation<CategoryDto, { id: string; is_featured: boolean }>({
      query: ({ id, is_featured }) => ({
        url: `/admin/categories/${encodeURIComponent(id)}/featured`,
        method: 'PATCH',
        body: { is_featured },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Category', id },
        { type: 'Category', id: 'LIST' },
      ],
    }),

    /* --------------------------------------------------------- */
    /* SET IMAGE – PATCH /api/admin/categories/:id/image         */
    /* --------------------------------------------------------- */
    setCategoryImageAdmin: build.mutation<CategoryDto, CategorySetImagePayload>({
      query: ({ id, asset_id, alt }) => ({
        url: `/admin/categories/${encodeURIComponent(id)}/image`,
        method: 'PATCH',
        body: {
          asset_id: asset_id ?? null,
          alt: alt ?? null,
        },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Category', id },
        { type: 'Category', id: 'LIST' },
      ],
    }),
  }),

  overrideExisting: false,
});

export const {
  useListCategoriesAdminQuery,
  useLazyListCategoriesAdminQuery,
  useGetCategoryAdminQuery,
  useLazyGetCategoryAdminQuery,
  useCreateCategoryAdminMutation,
  useUpdateCategoryAdminMutation,
  useDeleteCategoryAdminMutation,
  useReorderCategoriesAdminMutation,
  useToggleCategoryActiveAdminMutation,
  useToggleCategoryFeaturedAdminMutation,
  useSetCategoryImageAdminMutation,
} = categoriesAdminApi;
