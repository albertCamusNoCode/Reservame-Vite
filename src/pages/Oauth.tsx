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
        const redirectUri = "http://localhost:3000/oauth2/callback";
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

  return <h1>Loading</h1>;
}
export default OAuth2Callback;

