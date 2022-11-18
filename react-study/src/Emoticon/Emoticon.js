import React, { useEffect } from "react";
import { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
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

const Emoticon = () => {
  const [state, setState] = useState({
    html: ``,
    tagName: "div",
  });
  const [caret, setCaret] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [state2, setState2] = useState({
    type: "text",
    text: "",
    emogis: [
      {
        productId: "",
        emogiId: "",
      },
    ],
  });
  const [test, setTest] = useState("");
  const [isCategory, setIsCategory] = useState("sns");
  const ref = useRef();

  const category = (target) => {
    if (target === "sns") {
      setIsCategory("sns");
    } else {
      setIsCategory("set");
    }
  };

  function pasteHtmlAtCaret(html) {
    let sel, range;
    if (window.getSelection) {
      // IE9 and non-IE
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();

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
    } else if (document.selection && document.selection.type != "Control") {
      // IE < 9
      document.selection.createRange().pasteHTML(html);
    }
  }

  const addImg = (e) => {
    ref.current.focus();
    pasteHtmlAtCaret(`<img src=${e} />`);
  };

  const emojiListShow = () => {
    setIsShow(!isShow);
  };

  const onChangeFu = (e) => {
    setState((prev) => ({ ...prev, html: e.target.value }));
    setTest(e.target.value);
  };

  const sendMsg = () => {
    console.log(state.html);
    // setState2((prev) => ({
    //   ...prev,
    //   type: "text",
    //   text: state.html,
    //   emogis: [
    //     {
    //       productId: "",
    //       emogiId: "",
    //     },
    //   ],
    // }));
  };

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
                <STC.BigImg src={watch2} onClick={(e) => addImg(watch2)} />
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
    </>
  );
};

export default Emoticon;
