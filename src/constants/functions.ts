import axios from "axios";

export async function getGoogleData(token:String) {
    const data = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
      );
    return data.data
}