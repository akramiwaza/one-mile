import { getLinkPagination } from "src/helper/publicFunction";
import { setLoading } from "src/store/customizer/CustomizerSlice";
import { PostFunction } from "src/utils/axios_connection";
import UrlApi from "src/utils/Url";

export const GetAdminLogs =
  ({ callback, page, rowsPerPage, search, orderBy, typeOrder }) =>
  async (dispatch, getState) => {
    try {
      let link = `${UrlApi.admin_logs.get}?${getLinkPagination({
        page,
        fieldsSearch: [],
        orderBy: orderBy ?? "created_date",
        rowsPerPage,
        search,
        typeOrder,
      })}`;
      const response = await PostFunction({
        data: {},
        Route: link,
        showalert: false,
        state: getState,
        isMultipart: false,
        dispatch: dispatch,
      });
      callback(response);
    } catch (err) {
      callback(false);
    }
  };

export const EditAdminLogs =
  ({ callback, row }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      var data = {
        tableName: row?.table_name,
        idReleated: row?.related_id,
        id: row?.id,
      };
      const response = await PostFunction({
        data,
        Route: UrlApi.admin_logs.edit,
        showalert: true,
        state: getState,
        isMultipart: false,
        dispatch: dispatch,
      });
      dispatch(setLoading(false));
      callback(response);
    } catch (err) {
      dispatch(setLoading(false));
      callback(false);
    }
  };
