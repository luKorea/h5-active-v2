import { Dialog } from "vant";

/**
 *
 * @param title
 * @param message
 * @returns {Promise<unknown>}
 */
export const tipDialog = (title, message) => {
  return new Promise((resolve, reject) => {
    Dialog.confirm({
      title: title,
      message: message,
    })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};
