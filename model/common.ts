export type TLogin = {
  email: string;
  password: string;
};

export type Response<ResBody> = {
  message: string;
  data: ResBody;
};

// eslint-disable-next-line
export type Pagination<T = {}> = {
  data: T[] | null;
  pagination: {
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    total: number;
    totalPages: number;
  };
};

export type CommonQueryPagniation = {
  page: number;
  limit: number;
};
