/* eslint-disable @typescript-eslint/no-unused-vars */
import Modal, {ModalProps} from 'react-native-modals';
import React from 'react';
import 'react-i18next';
declare module 'react-i18next' {
  interface Resources {
    common: typeof common;
  }
}
declare global {
  interface FormDataValue {
    uri: string;
    name: string;
    type: string;
  }

  interface FormData {
    append(name: string, value: FormDataValue, fileName?: string): void;
    set(name: string, value: FormDataValue, fileName?: string): void;
  }
}
type ModalPortalProps = Omit<ModalProps, 'visible'>;
declare module 'react-native-modals' {
  class ModalPortal extends React.Component<ModalPortalProps> {
    constructor(props: ModalPortalProps);

    static get ref(): typeof Modal;
    static get size(): number;
    static show(children: React.ReactNode, props?: ModalPortalProps);
    static update(key: number, props?: ModalPortalProps);
    static dismiss(key: number): void;
    static dismissAll(): void;

    get current(): number;
    generateKey(): string;
    getIndex(): number;
    getProps(
      props: ModalPortalProps,
    ): ModalPortalProps & {visible: boolean; number: key};
    show(props: ModalPortalProps): number;
    update(key: number, props: ModalPortalProps): void;
    dismiss(key: number): void;
    dismissAll(): void;
    dismissHandler(key: number): void;
    renderModal(option: {
      type: 'modal' | 'bottomModal';
      props: ModalPortalProps;
    });
    render(): React.ReactElement;
  }
}
