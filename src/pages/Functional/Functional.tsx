/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import React, { useState } from "react";
// import keyCodes from "./../../../../keyboard/src/components/data/keyCodes";
import keyCodes from "./../../../keyboard/src/components/data/keyCodes.json";
import {
  functionalLayoutType,
  defaultFunctionalLayoutType,
  defaultPhysicalLayoutType,
} from "./../../../keyboard/src/components/data/keyboardSettings";
import Keyboard from "./../../../keyboard/src/components/keyboard";
import ReadJSONFile from "./../../components/ReadJSONFile";
import GetManySettings from "./../../components/GetManySettings";
import GetFileName from "./../../components/GetFileName";
import ConfirmButton from "./../../components/ConfirmButton";
import makeJSONFile from "./../../components/makeJSONFile";
import BackToHome from "./../../components/BackToHome";
import "./functional.css";
import "./../keyboard.css";

function keyToObject(keys: string[][]): object {
  const version = "1.0";
  const object = {};
  Object.assign(object, { version });
  for (let i = 0; i < keyCodes.length; i++) {
    Object.assign(object, { [keyCodes[i]]: [keys[0][i], keys[1][i]] });
  }
  return object;
}

export default function Functional(): JSX.Element {
  const [shift, setShift] = useState<boolean>(false);
  const [keys, setKeys] = useState<string[][]>([
    keyCodes.map(
      (
        keyCode // @ts-ignore
      ) => functionalLayoutType[defaultFunctionalLayoutType].content[keyCode][0]
    ),
    keyCodes.map(
      (
        keyCode // @ts-ignore
      ) => functionalLayoutType[defaultFunctionalLayoutType].content[keyCode][1]
    ),
  ]);
  const [fileName, setFileName] = useState<string>("");
  return (
    <>
      <div id="shift">
        <input
          type="checkbox"
          checked={shift}
          onChange={(e) => {
            setShift(e.target.checked);
          }}
        />
        <label>
          チェックボックスをクリックして、Shiftキーを押した状態を再現
        </label>
      </div>
      <Keyboard
        functional="custom"
        physical={defaultPhysicalLayoutType}
        keyLayout={keyToObject(keys)}
        isCustom={false}
        shift={shift}
      ></Keyboard>
      <div className="box"></div>
      <br />
      <div className="content">
        すでに作成したデータを読み込んでそれを編集したい場合は、ここからファイルを読み込んでください。はじめての場合は、無視してください。
      </div>
      <ReadJSONFile
        f={(x: object) => {
          setKeys([
            // @ts-ignore
            keyCodes.map((keyCode) => x[keyCode][0]), // @ts-ignore
            keyCodes.map((keyCode) => x[keyCode][1]),
          ]);
        }}
      ></ReadJSONFile>
      <br />
      <br />
      <div className="content">
        左に通常時に入力したいキーを、右にシフトキーを押した状態で入力したいキーを入力してください。編集すると、右のプレビューが変化するはずです。
      </div>
      <table>
        <tbody>
          {keyCodes.map((keyCode, i) => (
            <tr key={keyCode}>
              <th>{keyCode}</th>
              <td>
                <GetManySettings<string>
                  type="string"
                  className="input"
                  items={keys[0]}
                  setItems={(value: string[]) => {
                    setKeys([value, keys[1]]);
                  }}
                  i={i}
                ></GetManySettings>
              </td>
              <td>
                <GetManySettings<string>
                  type="string"
                  className="input"
                  items={keys[1]}
                  setItems={(value: string[]) => {
                    setKeys([keys[0], value]);
                  }}
                  i={i}
                ></GetManySettings>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div className="content">
        拡張子を除いたファイル名を入力して、確定ボタンを押してください。今作ったデータがダウンロードされます。
      </div>
      <GetFileName fileName={fileName} setFileName={setFileName}></GetFileName>
      <ConfirmButton
        f={() => {
          makeJSONFile(keyToObject(keys), fileName);
        }}
      ></ConfirmButton>
      <BackToHome></BackToHome>
    </>
  );
}
