import { client, resolveApiUrl } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, Faculty, FacultyPayload } from '../types';
import { mockFacultyApi } from './mockStore';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';

const normalizeFaculty = (faculty: Faculty): Faculty => {
  const fromProfileImage = faculty.profileImage?.url;
  const fromLegacyField = (faculty as Faculty & { profile_image?: string | null }).profile_image;
  const normalizedUrl = resolveApiUrl(fromProfileImage || fromLegacyField || null);

  if (!normalizedUrl) {
    return faculty;
  }

  return {
    ...faculty,
    profileImage: {
      url: normalizedUrl,
      public_id: faculty.profileImage?.public_id || '',
    },
  };
};

const normalizeListResponse = (response: ListResponse<Faculty>): ListResponse<Faculty> => ({
  ...response,
  data: Array.isArray(response.data) ? response.data.map(normalizeFaculty) : [],
});

const normalizeItemResponse = (response: ItemResponse<Faculty>): ItemResponse<Faculty> => ({
  ...response,
  data: response.data ? normalizeFaculty(response.data) : response.data,
});

export const facultyApi = {
  list: USE_MOCK
    ? () => mockFacultyApi.list()
    : () => client.request<ListResponse<Faculty>>('/faculty/all').then(normalizeListResponse),

  get: USE_MOCK
    ? (id: number | string) => mockFacultyApi.get(String(id))
    : (id: number | string) => client.request<ItemResponse<Faculty>>(`/faculty/${id}`).then(normalizeItemResponse),

  create: async (payload: FacultyPayload) => {
    if (USE_MOCK) {
      return mockFacultyApi.create(payload);
    }

    // If there is an image file, use FormData
    if (payload.profileImage instanceof File) {
      const formData = new FormData();
      formData.append('profileImage', payload.profileImage);
      
      // Append all nested JSON objects as stringified strings
      formData.append('basicInfo', JSON.stringify(payload.basicInfo || {}));
      if (payload.qualifications) formData.append('qualifications', JSON.stringify(payload.qualifications));
      if (payload.experience) formData.append('experience', JSON.stringify(payload.experience));
      if (payload.academic) formData.append('academic', JSON.stringify(payload.academic));
      if (payload.publications) formData.append('publications', JSON.stringify(payload.publications));
      if (payload.rolesAndAwards) formData.append('rolesAndAwards', JSON.stringify(payload.rolesAndAwards));
      if (payload.onlineLinks) formData.append('onlineLinks', JSON.stringify(payload.onlineLinks));
      if (payload.memberships) formData.append('memberships', JSON.stringify(payload.memberships));

      return client.requestForm<ItemResponse<Faculty>>('/faculty', formData, 'POST').then(normalizeItemResponse);
    }

    // Fallback to strict JSON if no image
    return client.request<ItemResponse<Faculty>>('/faculty', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then(normalizeItemResponse);
  },

  update: async (id: number | string, payload: FacultyPayload) => {
    if (USE_MOCK) {
      return mockFacultyApi.update(String(id), payload);
    }

    // If there is an image file, use FormData (Laravel form spoofing for PUT)
    if (payload.profileImage instanceof File) {
      const formData = new FormData();
      formData.append('_method', 'PUT'); // Laravel requirement for multipart PUT requests
      formData.append('profileImage', payload.profileImage);
      
      formData.append('basicInfo', JSON.stringify(payload.basicInfo || {}));
      if (payload.qualifications) formData.append('qualifications', JSON.stringify(payload.qualifications));
      if (payload.experience) formData.append('experience', JSON.stringify(payload.experience));
      if (payload.academic) formData.append('academic', JSON.stringify(payload.academic));
      if (payload.publications) formData.append('publications', JSON.stringify(payload.publications));
      if (payload.rolesAndAwards) formData.append('rolesAndAwards', JSON.stringify(payload.rolesAndAwards));
      if (payload.onlineLinks) formData.append('onlineLinks', JSON.stringify(payload.onlineLinks));
      if (payload.memberships) formData.append('memberships', JSON.stringify(payload.memberships));

      return client.requestForm<ItemResponse<Faculty>>(`/faculty/${id}`, formData, 'POST').then(normalizeItemResponse);
    }

    // Fallback to strict JSON if no image
    return client.request<ItemResponse<Faculty>>(`/faculty/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }).then(normalizeItemResponse);
  },

  delete: USE_MOCK
    ? (id: number | string) => mockFacultyApi.delete(String(id))
    : (id: number | string) => client.request<DeleteResponse>(`/faculty/${id}`, { method: 'DELETE' }),

  publicList: USE_MOCK
    ? () => mockFacultyApi.list()
    : () => client.request<ListResponse<Faculty>>('/faculty').then(normalizeListResponse),
};
