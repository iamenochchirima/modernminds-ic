// import { API_URL } from "../../../config/index";
import cookie from "cookie";
import axios from "axios";

const API_URL = "http://localhost:8000"

export default async (req, res) => {
  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    try {
      const apiRes = await axios.post(`${API_URL}/newsletter/main_newsletter/`, null, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access}`,
        },
      });
      const data = await apiRes.data;

      if (apiRes.status === 200) {
        return res.status(200).json({
          user: data,
        });
      } else {
        return res.status(apiRes.status).json({
          error: data.error,
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when sending emails",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
};
