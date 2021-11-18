import { useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";

function BaseInput(props) {
  return (
    <Form.Control type={props.type} value={props.value ? props.value : ''} placeholder={props.placeholder} onChange={(event)=> props.inputValue(event.target.value)} />
  );
}

export default BaseInput;
