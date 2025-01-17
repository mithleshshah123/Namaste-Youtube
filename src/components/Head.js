import React, { useEffect, useState } from "react";
import { toggleMenu } from "../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(searchQuery);
    const timer = setTimeout(() => {
      if(searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else{
        getSearchSuggestions()
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API  + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);
    // console.log(json[1]);

    dispatch(
      cacheResults({
        [searchQuery]:json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-12 cursor-pointer"
          alt="menu"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAYFBMVEX///8AAAD19fV5eXkkJCStra2mpqYfHx+IiIiOjo6FhYXs7OwrKyvh4eFJSUlRUVE8PDxEREQTExNtbW3Hx8cYGBiXl5e8vLzV1dU3Nzd/f39ycnLOzs5eXl7b29udnZ1Yi28ZAAACAElEQVR4nO3d7W6CQBCFYVDQyreoILaW+7/LWtum6Y+GQ9pkZvF9rmBOdlmWOBmjCAAAAAAAAAAAAMDDWLk1N8lLl63dynb9jEDleh+7Vlx7NcvrYF3stGTUsqxO1pVKtLW5WpepSUohy8vWukxRJoR5si5SVS9nl8Vxc54OU1sXqRqODxbmYF2kai8cZ5vWukrRdTpLlAdyNLepECbaWJep2StZQnlq1Ivzxf1j0w76R8Dxui8St4qmEu/Mn8o+dasXXv0AAAAAAAAAAADAvyjT7smrXZcq3VlfVpcqcfwbbZtUmfz7bFlYlzutyMV1sS5Uo61NZV2mRumdi/ow+k3jk9JxGkazyc3zdJZVMM1zwj4rnTebf6umD7RFhQmnR1M5zpZ0ACzraA5ln0kvzWVdZ6Lc/0WzVS+at7XJfH8CFPVOjfKuTMedW2M/5+MMAAAAAAAAAAAA+IP8mG7c6l9nRblUQ7J1q2hqabTR3dF/W0OrTJ26Z7GuVDJoe8z/utytlTBr6ypFJ2EuUB5Mv5kwerL332vySegEGgN5ZKROwM5x08xPQpg0sS5SJWyzc2NdpOowHSaURsD4pFxpQunRbIQsUZRZlylpxZ6z5wAOtEIYPPthrJ1POW0OM2Yc5pvsYj0w/3dZJy/LF+u/Mvjd3CQAAAAAAAAAAAAAwvUGNp9IT3UXWX4AAAAASUVORK5CYII="
        />
        <a href="/">
          <img
            className="h-12 mx-2"
            alt="youtube-logo"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAd4AAABpCAMAAACj+LKIAAAAzFBMVEX/////AAAoKCgkJCQWFhYTExMAAAC8vLwaGhrPz88QEBANDQ0gICDs7OwICAjBwcEuLi5AQECxsbH/zMzV1dWGhoY5OTny8vKenp62trbh4eH4+Pj/2to0NDTJycmpqan/ExP/xcXk5OSTk5N2dnaAgICOjo7/MDBeXl5qampLS0tVVVWfn5//p6f/jIz/5OT/7e3/SkpRUVH/QkL/9PRubm7/hYX/OTn/WFj/YGD/fHz/r6//o6P/cHD/UlL/lJT/Jib/vLz/aGj/iIjl2Z4NAAASa0lEQVR4nO2daXeiShCGuYCKimuMJBI1cYvGJGbR7DHL/f//6QLaUFV0AxMg4rnzfpicEQW6H+illm5JCtXyZrE4OTk5ODg4s/X1+nr19vFx/fDy8v79/Pz0tF7f3t7f3z8+ntt6tGT97/7W0nq9fnp6en7+fn/59+Pt6vXL/r11Hutsi8XN0gy/9l8lLhvn4uTs9e365ft5fXv/eP75eXr6T5I6Pf38tJ6E+/X3w6sNetdF/t/o5u3l9jNRlOE6X7+8LXZd8P+Blq+3v0zW0+f/mbDRguqkco3l1W+/tlinDzeplGsPVNDqnuRGGpdYPO0Urq3PszQKtgcqlGRPSjuFK5zsmq2jB9Fo2qwgcb/WcVq2SsX520qhjlJTIZcy3rNdg93qWXB/A7ULVF9xvjJ1KqduHbX+6LPk62hQb0TWhfEnZ04b70myE58YeuHfoCkrQHrD//oW8tvacf4tNxOvI6mTV6JKr2cK724HVUhX/DscaaAG5Lq/7Z2gLygpDD87eTmqlEzh/dg1U6DTE+4tHquw+tQaPW5OdXBcn6ZgEttXvDeZaZptPXHvsYOqTx3S45W6Ao5rk4SryLmFPcV7vWuiWPzpUQPi0+f0cAvVfbWXcBXZ2lO8N+e7BorFf31x31qmh4eo8dbScFfsKd6vXfOk4va+PVgFcp4OnWao601hWrS3eN93jZOKOzkatGHrXCITHxO13Wo/2RraaE/x7pqmT/dcD+EKvp907NTCtZuKzWo/8S53TdOvA959XsLeVZ/h3rWgpldBTPuJ92DXMP16490nql2lW0EHD+HAS+fZLOOrk0dCYzlZzuGDmcF7tWuYft3z7hN3r3nc/qJjZZ/RIw0hN49cjdMfpIk3SyYrJu6NoqlRDo+e8JudjkOc6BjjLcY4VZp4X3bNkiPu1KiAGuARPFSswkNpWCT92g+8y/WuWXL0yrvTCmyAlTt46Ah2hH6LZSraD7w3GfIWufrg3uod4Itb4BGcNOV/x5W/H3gXu0bJ0wP3VpHhUQdmZeMCvtjy7wRQ7wfebEThED1xDRst0dhqAKtHG/F+m7z2A+/rrlHydM7FW4EvKbQro5pWUwjU4Gk/8GbMG7gVPyYWdbGK9/kYvtZpBGrwtB94M+dQcMTH24Q1mvcMQ2jMlUqYMEf7gXf34c088VMWKnB6Wy6wj5EzSU0jUIOnX8FrDgaVSPZN0zC5I8o4eSfvqQUC8CM2zDnk6E5ve7DNVmk9m5XCcLSyNJo0i0Zyo+r08RrFw2mj3bhbXQ6Cfm20+oer+Xw+nc5Wh5cFFAS+fIwB4eTmITGgWFy7Bp4aeY6DPqgdpYF9DZX+PF9WNd2WlqtWG2NenE6xiQR672IPCVSdEG+lj0527P2khw70XWhcvJVhN6/pTlhtLj8SAq6N5XzOKp/1NbuIarl6MfTufxHHqnFg/f47MaRQfLuG1NNgNTCQMEgSGytbq7KKpsSyopUvCr7zHuZVoDyYc+klcCBXAs+OEG8PnawE2toRvozr+eDhvSzBO9d0/nyg1iihICXnBGp+xBr0WAHsjl/2LM77LxLfriGZsBhl9pDCthm5GoZ1X9nt4udWFXJe5E9E50ABmLISCW8V/aQhukw5AK+xIneu5PwPpWRMyMPLpLE2LJa3d+N2X74lBdXTOx8velFZQE4FuovyHgBzVuIXXtbaxG75S3iRaTwIr3lBvMnWx/4QFHNW5pfPasQam9b8LA4EFlWxTLwLFuUawakRM0/Belbu3N7RmPuqyPsasUtnDK855dy6jpwoNt0Gr21i324YieG12vjnZLAyrQV4YUyVsg12huMtzfMWjQIKT33CGcM74d66SprnSY73LbcmxvZ3vuJAgDFRX4mmOvCj6fDUSGk7DZAJY+w0t8qOAwsva8gpnCm8jR6/2dGnqCoE33KVt2snVr+JQ96uEgT8KMrUhyA0Z45TgUYNhUEzFEG/y1TqC866a7xi5dGI8E4P/rZ2KMU0OZOIxpvkAj/ORSttwLrbhDN3wCfeAz4kNaaXyrjFU+rg9c0gXkX3PZ85ODmqYbpauUqngPVKzFAcX8DqSVKhH5/8PEHrrYRzXMdpBEdbLpgKiq2TdXlU6I1x+WGse+bwKlp7NJdJF7zpTrdCYd+6PKkV+3e4ua5afXWsIREnHvkrmVmwIA1Uwtkmmv0BciOxAfExmjLoF85AqoUSHRSQA541vFrDPmaMMS+l4ZmfDRQ8eLG5LxTt7Vh4Yi11xAs3N5NZYIcbyW6rD4rgdEZwsDVnxFC2r1zamvSKqPggjTBjeDUWpE9G/1VvuA8NsXKVnWmIPKMXphTrZeMzWCQxCxbihSEbttMIuouc0YQtA1FxDZU4xxu0ddnCq8/YW9qqowMgswq1WW74UQU5xK3JXyyfj4jBIv4sWLwGEqhw22kE3UXu+1hDuLywLFS/3rueMbxVz3+AEh+9x1eqdGHgipeVMUfPbzEdvJJ0EHeMJcYLGiw70wi5i9hT38cpRy6UGuqS625blyxedJE/xwtHUPgXXgBSCz5CYJCIog2tz2N1lGK8kvkazxcsxlvzqlVpG3AE6ZUeR+141jycBVZy3+ps4QXWKbzogFcS1PWCHzTh5/qhFMsUEYBXkpaxslvEeDugXbLGGrCtdrGgwFho7UG1pR5lEi/0HZglfC52fRxd5v0A3ZQySxFvPDNHwPqDoD/KNU0ATHOLibtegLfL555dvGj+rrRZd4LGiHXvrvDyhY1U8UrSyY/nXV/ik4L+RRuD7CKlzr6BXIQI7x2uLfZxdvGiG/bW84LNE7S/4cGFHC81PxSvJH39sHMPwAv6I30Kkrq9+HVcSIh3hU157OPs4sUTeHl7FWSUU7re938bryS9/WiMJQi2cooMytYGT3fOHSmhgQfCizm6tAheYNvdNd45vv72Kp0u/BCE+/w+3p/lQQTgxeMKUEp3ujgU9r14fSSdVeQks3jvuHiLuODe938d7w9NHAGNs9TkejpBVspYiBdXsMbe9+w2zhivvr0KCv2FV/hlvD8ePAet3G1w8aqX7hewrQdmI11ivGzCmGbjfOH95Ad4L7h4hSvFULypjpyXP/fwBy7MjsvMKti1QRm4wxLjdbPN9gZvj3PtXeE9i+GOCsR7xHl9gX+vciHE28d4WSuc3ca5wcWLjFNBI+f08MaLrgvE2+LEoXjmdmnQEONFFem25/uGFzVCQXjTsjnHDcwJxFvhtM4gjhBNGwLfXhZXmV28KALBHQtiv24A3pQ8Rldxk8uC2/2R//XVvJrvYPhivO7ShdnF2+XinUTDW0/DnW91uvEzB4Px9v3BSWAE08HwA0bOzPU22RO8rHHGj2P9uLBVDRekLt0nzyCRkHZhrJWjAfKY2wLTIrwGB16DEOPVs48Xh2swvMSwo2tM+MGuJx9rtfw3AbgBoXSOjAbtfHWveqUWHlgH4GVW6sziNfil5NvtfOrGS87n4H1LJpb9M2RHwTHpfBW4cVALVTzCe7RveMkwYnuVw6h4Yy2t4cObQKe7kTCMfas+mfmiEOAWHj4G4GVHsosXP8bM5sxPQvKpK8WKaiR4E4igYxImobAqJGOrMsiB9729IKN7uG9vL0mt2F5lGA1vO956sAjvMskllG6D6ZIgFYsITL+hfS/Eq3GPZBcvCWRneEPSx7Zqx1u1DOBNOIdblN8rqvY7mO9HR84AL+aY/YmRQaYIRd6JhGonlQAax7zM03cYXhzFgFfUIPNe2C/jMYlr1sguXrLA//YQGXroAnWlszgQGN7k108R7BTpCbeywOAs+axWEC+eUbhGyb3Di1wKF60eX8Uk1tZIMO/TlWBlHE/Y+oaXcCY2Z8geWzNdj1Fm8eKgQDeUDgdEAoMdVWy86ezJHhSLs6lDvm/A0YDY4cE6dasoeNXs4B0I8CKPUcAyi3EXPjqLZdUUKnSbdbxxEcZLHErwII7jcN35mcVLNtdhK4KgHKqgRShjLVt2cpLWipQhVg2r3OgNxXhJtIaXjEBHZBqbLaeJF1T+n+MlSSgsjL2HwrWBx4gq1qKD69R2hg2xalCXPSRor/eE31HgbcDg3YVWCF7wg13jxdmGDC+OlOwGLJSZ8IwmGX0KFsbxVAnAKxpASTRKy/VDJIuXIImDt0iSSbexvjjvN2jLsyxuhPLPOhQv3j6B4D0U0iKxLSz6LrN4aT++vX4HuYHrAQvGprPkZ0yFTntJADDBi2128CChxVq1zOKtkajL7fWJQxQswTaYjsaTo36zVmy1Wlbx0lqyN5ZCp73Bby8JmAPjLuImZh8TvOLn4bfxFghe1gyj0uOxmK5paq5UrlZz1WYmtxD855+rULyVILy4gqHViqTLCvCC50GMtxARLxjX/jle/AzZi6FshGYAcM8f+Lrb/s5MbnQTOu2lI2e88RhJAAX+XnzADcISmzh/gJcMh+reT/4cbxPjdT0naHQB0/nhD2xzVia3qQqdF5HBBcFr4jzAuQCvhxF31vB1/wFePJmRQfbtn+MluY5uSVCjDbf2QZfoZnSTuVC6ZGpAtw3EOe3eal/YQl9yYwBEK5RIEvG3RsJL3ADeb3AjEQUv7jW8GxvA+4I2cuQzsfCaCS/Vm4S4+/diFfHUluDFE183p53mdbuf4wg7YKMnHptIeIkhEQT5YXOLCC/oSg2cIOg1N8gwB43qsFN2ypHBfaquI+AVDob8uLzGC4d/N9z5YhO/Pt5KSXhoEw0veSS8npFEtYrwAjMMXp8LNDeoJKC1Qd4U5/MM7jIXPrJCm2b48db4bRrOtwO1QnI3WFAETa+Nhhd38GAWfYRhCRtnzwlB4n3znv0Cdb6a272j1GfnOVnuGqZPIUHOG7wBDkF70UFcLdt5f1/kJCbtKRtbGTMS9BINLwl/Y6mLx6RPFq5Kp822lyFLSip3wPqItk1kJTFl9Pw695SaX+CnCoujsxXcOBPPkLJZEbaGMzrAdvcmCWlSm4ZpDC4bNJUpGl7yymuHFdM0ByMaeS9eMlRvDHuDTnNKF/yFG6zh4UXTeYQ6c7xcm/NhImkFSSrcJBk2tJKaJNRZPrw8GpXF4Xc05TB3MbvQc748xGh4aQ6BWp+u5povdjVgwV9FK+fzOfpw5eEOW3hx39x0YhVQxuvgbmw9sQI20lCEtjkMb4VmqWiqSmoL7XjkC/tni6Er3Qb8NBJe3zYOis6WVocn+9PF9hUZ3LBk4JAU3VdA18SVTsDFj/UY6i6y8QoDMjY6IoHQ/sqCi+1LBVFcuFqD+S7R8Hbq9CzsZIcwxFE4MRL9GlteJ2FbZbBhdgrbTMVRuD/BUisEr9H1taxYaGMCyZD5X1fHyKIVDS9edhf8ulE5DserC/LDwHTNUaUdWELNnRcsU9vI80eK8vIGxlo56gW/vuoKf52/KZDexnPiiHh7eXoiR/kWWjZC9PZ2+DkIVdiZ2Krxr7KRBnLqMjX1jTKwioA3OFFDvyMRDgPeu6DbwS/QhBwRL4kGYjfZxylhfLzK3DTpkNn59cgXchPQPGt30MWfodf3NDSKboM30Oa8KX1Z2HppXV+AQ9P/LuhOSg9cczYiXmnAuXTO6TpBn8HHaxseBxc+vnqDE1A11PglVNQ5enoz5DZ6i0Q3Cl6pVvdPbZyqyo85dXVIkCi5bdgp/CwiXqlGt+bUtyMdMCHn43U2FTemZHfL8pwbT9VqVP3thJJTaDv+tWuqTKKtP6k6cjnnKc/fUd0YWsUn9axo6pS/U/Yl3DdI0eqTbY1OS+7aBiqM1sjn4B2Qc9YaEJCem24NZ8O8ezKwf6/3oZbfXHUie2+moulDQTCk2ZzpOVBERVHVO86XM9L9nkcaV9nlOkYbWYu2Nq/URm2rxNuUKmtuqHRHRVHcaGsmb/bp1nJ6d+U238fjQ1fgHeqgTbb7dEvgyrCtq86m2Joqz91tu1veycau1Qx8eMjaoc64q6mbe66PfHu7goroXM67dV0t5XLWxLc7H7a47/nXrsnaCo+Q/IGKzeFoNrW0mlweC9k66hxPZvb3+j1K6wcye8PVvN2Yj5sBdAJk1IbT6Wx8dBx6L2anZz/thRofraObWOswJKKPwLr/q3h6TWOb9OhaR/AD/lUcnaWQyxlR11EszX8VV4ur6/f73/QRnj5+X79Gm+z+VSJaLhZf1+/P69v7x8fzz89TpLg0P88f72+fvl/+fXs9O1ksFjfhYZF/lZKWy5vF4gTrwNbZVl9fr1dvbx8f1w8vL+/f3+vzrR4f7+9vb9dPT8/f7y8P1x8fb6+vX2dnBwcni5s0hsd/xdN/fesWHge6E3IAAAAASUVORK5CYII="
          />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 p-2 bg-gray-100 rounded-r-full">
            Search
          </button>
        </div>
        {showSuggestions && (
          <div className="fixed bg-white py-2 px-5 w-[29rem] shodow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestions.map((s) => (
                <li key={s} className="py-2 shadow-sm hover:bg-gray-100">
                  🔍{s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-12"
          alt="user"
          src="data:image/png;base64,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"
        />
      </div>
    </div>
  );
};

export default Head;
