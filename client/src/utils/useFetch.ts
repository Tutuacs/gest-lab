import { useSession } from "next-auth/react";
import { Backend_URL } from "@/lib/Constants";
import { useToast } from "@/components/ui/use-toast";
import { getToastConfig } from "@/components/ui/toastConfig";

const useFetch = (title?: string) => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const refreshToken = async () => {
    if (!session || !session.tokens) return;

    const res = await fetch(`${Backend_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        authorization: `Refresh ${session.tokens.refresh}`,
      },
    });

    const response = await res.json();
    console.log("refresh ", response);
    session.profile = response.profile;

    session.tokens = response;
  };

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    if (!session || !session.profile) {
      console.warn("Sessão não encontrada no fetchWithAuth");
      return { data: null, status: 401 };
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${session.tokens.access}`,
    };

    if (!(new Date().getTime() < session.tokens.expiresIn)) {
      await refreshToken();
      headers.Authorization = `Bearer ${session.tokens.access}`;
    }

    const res = await fetch(`${Backend_URL}${url}`, { ...options, headers });
    console.log("fetchWithAuth ", res);
    return handleResponse(res);
  };

  const handleResponse = async (res: Response) => {
    console.log("handleResponse1 ");

    let data: any = null;
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
      console.log("handleResponse2 JSON parsed");
    } else {
      data = { message: await res.text() };
      console.log("handleResponse2 Text parsed");
    }

    const config = getToastConfig(res.status.toString());

    if (res.status === 200 || res.status === 201) {
      data.message = data.message || title;
    }

    toast({
      title: config!.title,
      description: data!.message,
      variant: config!.variant
    });

    console.log("handleResponse ", { data, status: res.status });

    return { data, status: res.status };
  };


  return { fetchWithAuth };
};

export default useFetch;