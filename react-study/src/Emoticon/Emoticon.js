import React, { useCallback, useEffect } from "react";
import { useState, useRef } from "react";
import * as _ from "lodash";
import ContentEditable from "react-contenteditable";
import { findAll } from "highlight-words-core";
import watch from "../asset/images/view-m-detail.png";
import watch2 from "../asset/images/twitter.png";
import watch3 from "../asset/images/kakao.png";
import watch4 from "../asset/images/line.png";
import watch5 from "../asset/images/new.png";
import watch6 from "../asset/images/my-request-star.png";
import watch7 from "../asset/images/studioSettingIcon_gray.png";
import watch8 from "../asset/images/submitIcon.png";
import watch9 from "../asset/images/watch_stretch.png";
import * as STC from "./Emoticon.style";

// function StudioHeader() {
//   return <STC.BigDiv></STC.BigDiv>;
// }

const Emoticon = () => {
  const [state, setState] = useState({
    html: ``,
    tagName: "div",
  });
  const [emogiCodeData, setEmogiCodeData] = useState("");
  const [caret, setCaret] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [state2, setState2] = useState({
    html: ``,
    tagName: "div",
  });
  const [state3, setState3] = useState({
    html: ``,
    tagName: "div",
  });
  const [test, setTest] = useState("");
  const [testVal, setTestVal] = useState("test$smile");
  const [isCategory, setIsCategory] = useState("sns");
  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  const category = (target) => {
    if (target === "sns") {
      setIsCategory("sns");
    } else {
      setIsCategory("set");
    }
  };

  const addImg = useCallback(
    (e) => {
      ref.current.focus();
      const emogiList = [
        {
          emogiUrl:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAMAAADQmBKKAAAAQlBMVEVHcEwboPQbofIbofIcofIZovUXo/YcofIcofMcofIcofIdofL///80q/Tw+f6p2/rY7/2W0/lNtfV6yPhkv/fD5vwQvRKPAAAAC3RSTlMAPVd8riQT8pXcw7VnuHgAAASUSURBVHja1ZzZYqsgEIajoIAIiMv7v+qJqW3TxMgMMMqZy17YL/DPwja3W4o1NeNdp5QQWguhVNdxVje3S6ypZXfH2DPRyZOp7jBKB0ydBdUCYJ6gWmKcCk6zMbGKcKYYkuabiWbuGil0pAmZH6nhOsl4XqQqEeeBlE9MbQacB1Iml6uFzmSiLkA8uaXEhM5qgqXxcJ3dZIKSKqUJTEVPG9NEFqltqcmMxwSfThNahxZSozSpYYVUCU1sApVJak1vmLB9Bg/G2U7iARPR6weno+Y0njsRwNdapU80FY5HnT7VugvzxYfkX4iD/dqhsFtxPpBoyxFQUEZMX2Ifq9pKX2RNSRN2MGm1vszqUjzs0NOkvtBkQYr+pGt+LdDbOqTRuqwhklcDycIGSOu2rAF6GaIrY9BuLGK6AHvOsaoEIFVMUHyvHbNL2szeT/MYLevMkp6W/susQzEJmrpjsv2TLfPvsAXxamwaM+EfbIb+xdzPsA3QhAaeMWdDRMb2b7YYM/r17zNwzsA+Zu6qGJHj8z5UYT8DR8WpDxEd8Qzg2Aiu7V0fIPJHPGb9STOk2gdL6Ov3fyYyxzyzC46SwIXpTbB2xg/Q4NdfYw1ERAwL9FGetg/YCBIRxwP1w96nxxDPHP4XHJXpn33ImV0nPDAL4HlkfHhScH/+gTcIHwtGsG9DVdMvQ2BfRsn1Ia8HLT4QtdC7W7sZCjSBayJM9brzL60fQVMGBWKo4mzfj+zip9EERA0Fkrgl9NGs2CHR5Te/x63phz7S4EC4bTMTSwStZTvMCmgVcCwR0OvvkRFR4NvVqbyNAtIUQNECglVnWwEi8vhYwBwJ0BwPNJEAaRsNZOBAmH0GH8tjETsOGCBjqSV0B0IFxpk4Tq+BEZc6PPGMoXNZnOs7DBB2b2iydInsUX6gtxcNepAW1EZjxHbe6AYiSa8lLHbL3HvvloEkj20nDFgNUSpoXQZht4TRwRGjoMdCkdMOkTWYj/OYXfyFJs//bDag3Qw1aQPu21XULjWirsZN2LbriT+uNwtFCPrZ0os5Chphg+SRn2UJRy8zIFwv2I9WiUcdo83LIxJPyAOJf0B/kCcdvoSUveA/WSccT43O5tXz04zhD/DMFBK0nSPGXMYdcc4e4F4mRgQV6hDYTI9CCJI27BQlSoU9JofuezgT57QMfZHAQBZBSyTOy6UmmUnNbowNsi+3UVq4h32eucEbHW9t/HUdM73lMbv4OYXm/dIX+r7OOE93r1sW5/yUyPK93Cj7ytfVV5qa8q8NXnqpaf8mfGlXT8u7nHudrpv/5YJ3eVfgT35lspflC7gzXF30UDJCQGU+xSF/nAgJ0WU/5yrvwduJSQ38kLO0R5MnEaFeTNeFPbylV7ZAt5SgjUcxb+4pE62K6krQkpX90V0SaISkEppttATLx8R2JLn9P70XSd5BytKtJV+zDZWrn02e9iipTVH+zFs6kmB521klIuXGSUSiwElAosLZ2o4hmYQkbDu2hUoOZhK8vp1iFQtDCc6q25nW1JJ/iJjq9OZ+f/ofSskfDRCV6riUyd0P/wEGvshP3sITdAAAAABJRU5ErkJggg==",
          emogiCode: "$smile",
        },
        {
          emogiUrl:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAMAAADQmBKKAAAAQlBMVEVHcEwboPQbofIbofIcofIZovUXo/YcofIcofMcofIcofIdofL///80q/Tw+f6p2/rY7/2W0/lNtfV6yPhkv/fD5vwQvRKPAAAAC3RSTlMAPVd8riQT8pXcw7VnuHgAAASUSURBVHja1ZzZYqsgEIajoIAIiMv7v+qJqW3TxMgMMMqZy17YL/DPwja3W4o1NeNdp5QQWguhVNdxVje3S6ypZXfH2DPRyZOp7jBKB0ydBdUCYJ6gWmKcCk6zMbGKcKYYkuabiWbuGil0pAmZH6nhOsl4XqQqEeeBlE9MbQacB1Iml6uFzmSiLkA8uaXEhM5qgqXxcJ3dZIKSKqUJTEVPG9NEFqltqcmMxwSfThNahxZSozSpYYVUCU1sApVJak1vmLB9Bg/G2U7iARPR6weno+Y0njsRwNdapU80FY5HnT7VugvzxYfkX4iD/dqhsFtxPpBoyxFQUEZMX2Ifq9pKX2RNSRN2MGm1vszqUjzs0NOkvtBkQYr+pGt+LdDbOqTRuqwhklcDycIGSOu2rAF6GaIrY9BuLGK6AHvOsaoEIFVMUHyvHbNL2szeT/MYLevMkp6W/susQzEJmrpjsv2TLfPvsAXxamwaM+EfbIb+xdzPsA3QhAaeMWdDRMb2b7YYM/r17zNwzsA+Zu6qGJHj8z5UYT8DR8WpDxEd8Qzg2Aiu7V0fIPJHPGb9STOk2gdL6Ov3fyYyxzyzC46SwIXpTbB2xg/Q4NdfYw1ERAwL9FGetg/YCBIRxwP1w96nxxDPHP4XHJXpn33ImV0nPDAL4HlkfHhScH/+gTcIHwtGsG9DVdMvQ2BfRsn1Ia8HLT4QtdC7W7sZCjSBayJM9brzL60fQVMGBWKo4mzfj+zip9EERA0Fkrgl9NGs2CHR5Te/x63phz7S4EC4bTMTSwStZTvMCmgVcCwR0OvvkRFR4NvVqbyNAtIUQNECglVnWwEi8vhYwBwJ0BwPNJEAaRsNZOBAmH0GH8tjETsOGCBjqSV0B0IFxpk4Tq+BEZc6PPGMoXNZnOs7DBB2b2iydInsUX6gtxcNepAW1EZjxHbe6AYiSa8lLHbL3HvvloEkj20nDFgNUSpoXQZht4TRwRGjoMdCkdMOkTWYj/OYXfyFJs//bDag3Qw1aQPu21XULjWirsZN2LbriT+uNwtFCPrZ0os5Chphg+SRn2UJRy8zIFwv2I9WiUcdo83LIxJPyAOJf0B/kCcdvoSUveA/WSccT43O5tXz04zhD/DMFBK0nSPGXMYdcc4e4F4mRgQV6hDYTI9CCJI27BQlSoU9JofuezgT57QMfZHAQBZBSyTOy6UmmUnNbowNsi+3UVq4h32eucEbHW9t/HUdM73lMbv4OYXm/dIX+r7OOE93r1sW5/yUyPK93Cj7ytfVV5qa8q8NXnqpaf8mfGlXT8u7nHudrpv/5YJ3eVfgT35lspflC7gzXF30UDJCQGU+xSF/nAgJ0WU/5yrvwduJSQ38kLO0R5MnEaFeTNeFPbylV7ZAt5SgjUcxb+4pE62K6krQkpX90V0SaISkEppttATLx8R2JLn9P70XSd5BytKtJV+zDZWrn02e9iipTVH+zFs6kmB521klIuXGSUSiwElAosLZ2o4hmYQkbDu2hUoOZhK8vp1iFQtDCc6q25nW1JJ/iJjq9OZ+f/ofSskfDRCV6riUyd0P/wEGvshP3sITdAAAAABJRU5ErkJggg==2",
          emogiCode: "$smile2",
        },
      ];
      let emogiSrc = e.target.getAttribute("data-target");
      emogiList.map((item) => {
        if (item.emogiCode === emogiSrc) {
          setEmogiCodeData(item.emogiCode);
          console.log("emogiCodeData?", emogiCodeData);
          pasteHtmlAtCaret(
            `<img src=${item.emogiUrl} data-target=${item.emogiCode}/>`
          );
        }
      });
    },
    [emogiCodeData]
  );

  const pasteHtmlAtCaret = useCallback((html) => {
    let sel, range;
    if (window.getSelection) {
      // IE9 and non-IE
      sel = window.getSelection();
      const el = document.createElement("div");
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();

        el.innerHTML = html;

        let frag = document.createDocumentFragment(),
          node,
          lastNode;
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);

        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    }
  }, []);

  const emojiListShow = () => {
    setIsShow(!isShow);
  };

  const onChangeFu = (e) => {
    setState((prev) => ({ ...prev, html: e.target.value }));
    setTest(e.target.value);
  };

  const onChangeFu2 = (e) => {
    setTestVal(e.target.value);
  };

  const sendMsg = () => {
    ref3.current.focus();
    pasteHtmlAtCaret3(state.html);
    // pasteHtmlAtCaret3(emogiCodeData);
  };

  const toImg = () => {
    ref2.current.focus();
    pasteHtmlAtCaret2(testVal);
  };

  function pasteHtmlAtCaret2(html) {
    let sel, range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();

        let el = document.createElement("div");

        const textToHighlight = html;
        const searchWords = [`$smile`, `$cry`];
        const emogiList = [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAMAAADQmBKKAAAAQlBMVEVHcEwboPQbofIbofIcofIZovUXo/YcofIcofMcofIcofIdofL///80q/Tw+f6p2/rY7/2W0/lNtfV6yPhkv/fD5vwQvRKPAAAAC3RSTlMAPVd8riQT8pXcw7VnuHgAAASUSURBVHja1ZzZYqsgEIajoIAIiMv7v+qJqW3TxMgMMMqZy17YL/DPwja3W4o1NeNdp5QQWguhVNdxVje3S6ypZXfH2DPRyZOp7jBKB0ydBdUCYJ6gWmKcCk6zMbGKcKYYkuabiWbuGil0pAmZH6nhOsl4XqQqEeeBlE9MbQacB1Iml6uFzmSiLkA8uaXEhM5qgqXxcJ3dZIKSKqUJTEVPG9NEFqltqcmMxwSfThNahxZSozSpYYVUCU1sApVJak1vmLB9Bg/G2U7iARPR6weno+Y0njsRwNdapU80FY5HnT7VugvzxYfkX4iD/dqhsFtxPpBoyxFQUEZMX2Ifq9pKX2RNSRN2MGm1vszqUjzs0NOkvtBkQYr+pGt+LdDbOqTRuqwhklcDycIGSOu2rAF6GaIrY9BuLGK6AHvOsaoEIFVMUHyvHbNL2szeT/MYLevMkp6W/susQzEJmrpjsv2TLfPvsAXxamwaM+EfbIb+xdzPsA3QhAaeMWdDRMb2b7YYM/r17zNwzsA+Zu6qGJHj8z5UYT8DR8WpDxEd8Qzg2Aiu7V0fIPJHPGb9STOk2gdL6Ov3fyYyxzyzC46SwIXpTbB2xg/Q4NdfYw1ERAwL9FGetg/YCBIRxwP1w96nxxDPHP4XHJXpn33ImV0nPDAL4HlkfHhScH/+gTcIHwtGsG9DVdMvQ2BfRsn1Ia8HLT4QtdC7W7sZCjSBayJM9brzL60fQVMGBWKo4mzfj+zip9EERA0Fkrgl9NGs2CHR5Te/x63phz7S4EC4bTMTSwStZTvMCmgVcCwR0OvvkRFR4NvVqbyNAtIUQNECglVnWwEi8vhYwBwJ0BwPNJEAaRsNZOBAmH0GH8tjETsOGCBjqSV0B0IFxpk4Tq+BEZc6PPGMoXNZnOs7DBB2b2iydInsUX6gtxcNepAW1EZjxHbe6AYiSa8lLHbL3HvvloEkj20nDFgNUSpoXQZht4TRwRGjoMdCkdMOkTWYj/OYXfyFJs//bDag3Qw1aQPu21XULjWirsZN2LbriT+uNwtFCPrZ0os5Chphg+SRn2UJRy8zIFwv2I9WiUcdo83LIxJPyAOJf0B/kCcdvoSUveA/WSccT43O5tXz04zhD/DMFBK0nSPGXMYdcc4e4F4mRgQV6hDYTI9CCJI27BQlSoU9JofuezgT57QMfZHAQBZBSyTOy6UmmUnNbowNsi+3UVq4h32eucEbHW9t/HUdM73lMbv4OYXm/dIX+r7OOE93r1sW5/yUyPK93Cj7ytfVV5qa8q8NXnqpaf8mfGlXT8u7nHudrpv/5YJ3eVfgT35lspflC7gzXF30UDJCQGU+xSF/nAgJ0WU/5yrvwduJSQ38kLO0R5MnEaFeTNeFPbylV7ZAt5SgjUcxb+4pE62K6krQkpX90V0SaISkEppttATLx8R2JLn9P70XSd5BytKtJV+zDZWrn02e9iipTVH+zFs6kmB521klIuXGSUSiwElAosLZ2o4hmYQkbDu2hUoOZhK8vp1iFQtDCc6q25nW1JJ/iJjq9OZ+f/ofSskfDRCV6riUyd0P/wEGvshP3sITdAAAAABJRU5ErkJggg==",
        ];

        const chunks = findAll({
          searchWords,
          autoEscape: true,
          caseSensitive: false,
          textToHighlight,
        });

        // const rr = /(\$smile)|(\$cry)/g;

        const strSplit = html.split("$smile");
        console.log("strSplit", strSplit);

        const strArr = html.split("");
        console.log("html?", html);
        console.log("strArr", strArr);
        console.log(
          "?",
          strArr.filter((item) => item === "$")
        );

        strArr.map((item) => {
          if (item === "$smile") {
            console.log("1");
          }
        });

        // const test = _.words(html, "");
        // console.log("tt", test);

        // console.log("rr.test(html)?", rr.test(html));

        // const sm = "$smile";

        // const searchRegex = new RegExp("(" + sm + ")", "ig");

        // html = html.replace(searchRegex, '<span class="highlight">$1</span>');

        // console.log("11", html);
        // console.log("chunks?", chunks);
        const highlightedText = chunks
          .map((chunk) => {
            const { end, highlight, start } = chunk;
            const text = textToHighlight.substr(start, end - start);
            console.log(text);
            if (highlight) {
              if (text == "$smile") {
                return `<img src=${emogiList[0]} />`;
              }
            } else {
              return text;
            }
          })
          .join("");

        el.innerHTML = highlightedText;

        let frag = document.createDocumentFragment(),
          node,
          lastNode;

        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }

        range.insertNode(frag);

        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    }
  }

  function pasteHtmlAtCaret3(html) {
    let sel, range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        console.log("html?", html);
        console.log("?", html.includes("<img"));
        let el = document.createElement("div");

        el.innerHTML = html;

        let frag = document.createDocumentFragment(),
          node,
          lastNode;

        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }

        range.insertNode(frag);

        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    }
  }

  const parser = () => {
    // const text = "ㅋㅌㅊㅍㅁㄴㅇ$코드ㅋㅋㅋㅋ\\$ㅋㅋㅋ$";
    const text = "test$sm\\$scfh$";

    let sIdx = 0;
    let eIdx = 0;
    let delimeterIdx = 0;
    let textIndex = -1;

    let resultStr = "";

    function findDelimeter(t, startIdx) {
      let i1, i2;

      i1 = t.indexOf("\\$", startIdx);
      i2 = t.indexOf("$", startIdx);
      console.log("start---");
      console.log("i1, i2", i1, i2);

      if (i1 < 0 && i2 < 0) {
        return -1;
      } else if (i1 < 0 && i2 > 0) {
        return i2;
      } else if (i1 > 0 && i2 < 0) {
        return i1;
      } else if (i1 > 0 && i2 > 0) {
        console.log("Math.min(i1, i2)?", Math.min(i1, i2));
        // 가장 작은 숫자 반환
        return Math.min(i1, i2);
      }

      // min(i1, i2)

      // return min(i1, i2);
      return -1;
    }

    // eIdx = text.indexOf('$');
    // eIdx = text.indexOf('\\');

    eIdx = findDelimeter(text, sIdx);
    console.log("eIdx?", eIdx);

    while (eIdx > 0) {
      console.log("text.charAt(eIdx), eIdx: ", text.charAt(eIdx), eIdx);

      if (text.charAt(eIdx) == "$") {
        console.log("--> $");

        console.log(
          "text.substring(sIdx, eIdx), eIdx: ",
          text.substring(sIdx, eIdx),
          eIdx
        );

        resultStr += text.substring(sIdx, eIdx);
        resultStr +=
          "<img src='https://aaa.test.com/img/" + delimeterIdx + ".png'>";
        console.log("resultStr?", resultStr);
        delimeterIdx++;

        sIdx = eIdx + 1;
        console.log("sIdx: ", sIdx);
      } else if (text.charAt(eIdx) == "\\") {
        console.log("--> \\");

        resultStr += text.substring(sIdx, eIdx);
        resultStr += "\\$";
        console.log("sIdx---", sIdx);
        sIdx = eIdx + 2;
        console.log("sIdx---2", sIdx);
      }

      // sIdx = eIdx + 1;
      // eIdx = text.indexOf('$', sIdx);
      eIdx = findDelimeter(text, sIdx);

      if (eIdx == -1) {
        console.log(
          "text.substring(sIdx), eIdx--- ",
          text.substring(sIdx),
          eIdx
        );

        resultStr += text.substring(sIdx);
        console.log("resultStr---", resultStr);
        break;
      }
    }

    console.log(resultStr);
  };

  useEffect(() => {
    parser();
  }, []);

  return (
    <>
      <STC.Wrap>
        <STC.Imgimg src={watch} onClick={() => emojiListShow()} />
        <ContentEditable
          id="editor"
          innerRef={ref}
          html={state.html}
          disabled={false}
          tagName={state.tagName}
          data-placeholder="emogi..."
          onChange={(e) => {
            onChangeFu(e);
          }}
        />
        <STC.Button onClick={() => sendMsg()}>SEND</STC.Button>

        <ContentEditable
          id="sendBox"
          innerRef={ref3}
          html={state3.html}
          disabled={false}
          tagName={state3.tagName}
          data-placeholder="send..."
        />
      </STC.Wrap>
      {isShow && (
        <STC.Container>
          <STC.TopWrap>
            <STC.CategotyImg src={watch} onClick={() => category("sns")} />
            <STC.CategotyImg src={watch5} onClick={() => category("set")} />
          </STC.TopWrap>
          <STC.BottomWrap>
            {isCategory === "sns" ? (
              <STC.BottomInnerWrap>
                <STC.BigImg
                  src={watch2}
                  onClick={(e) => addImg(e)}
                  data-target="$smile"
                />
                <STC.BigImg src={watch3} onClick={(e) => addImg(watch3)} />
                <STC.BigImg src={watch4} onClick={(e) => addImg(watch4)} />
              </STC.BottomInnerWrap>
            ) : (
              <STC.BottomInnerWrap>
                <STC.BigImg src={watch5} onClick={(e) => addImg(watch5)} />
                <STC.BigImg src={watch6} onClick={(e) => addImg(watch6)} />
                <STC.BigImg src={watch7} onClick={(e) => addImg(watch7)} />
                <STC.BigImg src={watch8} onClick={(e) => addImg(watch8)} />
                <STC.BigImg src={watch9} onClick={(e) => addImg(watch9)} />
              </STC.BottomInnerWrap>
            )}
          </STC.BottomWrap>
        </STC.Container>
      )}

      <>
        <STC.Input
          type="text"
          value={testVal}
          id="inputId"
          onChange={(e) => {
            onChangeFu2(e);
          }}
        />
        <STC.Button onClick={toImg}>To Img</STC.Button>

        <STC.Wrap>
          {/* <STC.BigDiv id="testDiv"></STC.BigDiv> */}
          <ContentEditable
            id="recieveBox"
            innerRef={ref2}
            html={state2.html}
            disabled={false}
            tagName={state2.tagName}
            data-placeholder="recieve..."
          />
        </STC.Wrap>
      </>
    </>
  );
};

export default Emoticon;
