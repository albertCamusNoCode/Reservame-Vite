import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../data-actions/auth';
import { useToast } from "@/components/ui/use-toast";
function OAuth2Callback() {
  const { continueWithGoogle, setAuthToken } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      if (code) {
        const redirectUri = window.location.origin + "/oauth2/callback";
        try {
          const { token } = await continueWithGoogle(code, redirectUri);
          if (token) {
            setAuthToken(token);
            navigate("/dashboard");
          } else {
            toast({
              title: "Error",
              description: "Authentication failed. Please try again."
            });
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "An error occurred during authentication."
          });
        }
      } else {
        toast({
          title: "Error",
          description: "No authorization code found."
        });
      }
    };

    handleGoogleAuth();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-blue-400 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-blue-400 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-blue-400 rounded"></div>
            <div className="h-4 bg-blue-400 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OAuth2Callback;

