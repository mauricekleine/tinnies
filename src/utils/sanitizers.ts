import escape from "validator/lib/escape";
import trim from "validator/lib/trim";

export const sanitizeString = (data: string) => trim(escape(data));
