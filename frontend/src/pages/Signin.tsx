import { Quote } from "../components/Quote"
import { Sign } from "../components/Signup-Signin"

export const Signin = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
              <Sign type="signin"/>  
            </div>
            <div className="hidden lg:block">
                <Quote/>
            </div>
        </div>
    )
}