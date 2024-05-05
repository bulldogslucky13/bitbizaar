"use client";

import { useMetaMask } from "metamask-react";
import { createNewListingAction } from "./create-new-listing-action";
import { MdAdd, MdCheck } from "react-icons/md";
import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Label,
  Modal,
  ModalOverlay,
  TextField,
  Input,
} from "react-aria-components";
import { Formik, Form } from "formik";
import { z } from "zod";
import { LoadingSpinner } from "../../loading-spinner/loading-spinner";
import { useState } from "react";
import { mutate } from "swr";
import { utils as web3Utils } from "web3";

export function CreateNewListingButton() {
  const { account } = useMetaMask();

  if (!account)
    throw new Error("Must be logged in to show Create New Listing Button");

  return (
    <DialogTrigger>
      <Button className="text-white flex space-x-3 items-center px-4 py-2 bg-slate-500 hover:bg-slate-600 active:bg-slate-700 transition-colors 0.1s rounded-md">
        <MdAdd className="h-7 w-7 text-inherit" />
        <span> Create Listing</span>
      </Button>
      <ModalOverlay
        className={({ isEntering, isExiting }) => `
          fixed inset-0 z-10 overflow-y-auto bg-black/25 flex min-h-full items-center justify-center p-4 text-center backdrop-blur
          ${isEntering ? "animate-in fade-in duration-300 ease-out" : ""}
          ${isExiting ? "animate-out fade-out duration-200 ease-in" : ""}
        `}
        isDismissable
      >
        <Modal
          className={({ isEntering, isExiting }) => `
            w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl
            ${isEntering ? "animate-in zoom-in-95 ease-out duration-300" : ""}
            ${isExiting ? "animate-out zoom-out-95 ease-in duration-200" : ""}
          `}
        >
          <Dialog role="alertdialog" className="outline-none relative">
            <CreateNewListingForm account={account} />
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}

function CreateNewListingForm({ account }: { account: string }) {
  const [successfullyPosted, setSuccessfullyPosted] = useState(false);

  return (
    <Formik<{
      title: string | null;
      description: string | null;
      price: number | null;
    }>
      initialValues={{
        title: null,
        description: null,
        price: null,
      }}
      validateOnMount
      validate={(values) => {
        const parseResult = z
          .object({
            title: z.string(),
            description: z.string(),
            price: z.number().positive(),
          })
          .safeParse(values);

        return parseResult.error?.issues.reduce(
          (acc, issue) => ({
            ...acc,
            [issue.path.toString()]: issue.message,
          }),
          {}
        );
      }}
      onSubmit={async ({ description, price, title }, { setSubmitting }) => {
        console.log(description, price, title);
        if (!description || !price || !title) return;

        try {
          await createNewListingAction({
            title,
            description,
            price,
            fromAddress: account,
          });
          setSubmitting(false);
          setSuccessfullyPosted(true);

          // Mutate the items for sale in the display
          await mutate("itemsForSale");

          await new Promise((res) => setTimeout(res, 5000));
          setSuccessfullyPosted(false);
          close();
        } catch (error) {
          console.error("Failed to create new listing", error);
        }
      }}
    >
      {({ handleChange, errors, isSubmitting, values }) => (
        <Form>
          <Heading className="flex justify-between text-xl font-semibold leading-6 my-0 text-slate-700">
            <span>Create New Listing</span>
            {isSubmitting ? (
              <LoadingSpinner width={24} height={24} isIndeterminate />
            ) : successfullyPosted ? (
              <MdCheck className="w-6 h-6 text-green-600" />
            ) : null}
          </Heading>
          <div className="flex flex-col w-full gap-2 mt-2">
            <TextField
              name="title"
              className="flex flex-col text-slate-500"
              autoFocus
            >
              <Label>Title</Label>
              <Input
                className="border-[1px] flex-1 rounded-md px-2 py-1"
                onChange={handleChange}
              />
            </TextField>
            <TextField
              name="description"
              className="flex flex-col text-slate-500"
            >
              <Label>Description</Label>
              <Input
                className="border-[1px] flex-1 rounded-md px-2 py-1"
                onChange={handleChange}
              />
            </TextField>
            <TextField name="price" className="flex flex-col text-slate-500">
              <Label>
                Price (WEI)
                {values.price
                  ? `(${web3Utils.fromWei(values.price, "ether")} ETH)`
                  : ""}
              </Label>
              <Input
                className="border-[1px] flex-1 rounded-md px-2 py-1"
                type="number"
                onChange={handleChange}
                step={1}
                min={0}
              />
            </TextField>
            <Button
              type="submit"
              className="bg-slate-500 px-4 py-2 rounded-md text-white 
            disabled:bg-slate-400  disabled:text-slate-500
            hover:bg-slate-600 active:bg-slate-700 transition-colors 0.1s"
              isDisabled={Object.keys(errors).length > 0}
            >
              Submit Form
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
