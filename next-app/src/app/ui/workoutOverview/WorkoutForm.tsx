"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { createWorkoutAction } from "@/app/actions/workout";
import { barlow } from "@/app/ui/fonts";

const NAME_MIN_LENGTH = 5;

const workoutFormSchema = z.object({
  name: z
    .string()
    .nonempty("Please specify a name")
    .min(
      NAME_MIN_LENGTH,
      `The name is required (${NAME_MIN_LENGTH} characters minimum)`,
    ),
  note: z.string().optional(),
});
type WorkoutFormFields = z.infer<typeof workoutFormSchema>;

export default function WorkoutForm() {
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setFormStatus({});
  };
  const handleClose = () => {
    setOpen(false);
    setFormStatus({});
  };

  const { control, handleSubmit, formState, reset } =
    useForm<WorkoutFormFields>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(workoutFormSchema),
      defaultValues: {
        name: "",
        note: "",
      },
    });

  const { isValid, isDirty } = formState;

  const onSubmit = async (data: { name: string; note?: string }) => {
    try {
      const result = await createWorkoutAction(1, data.name, data.note ?? "");

      if (result.success) {
        setFormStatus({
          success: true,
          message: "Workout created successfully! You can now add sets to it.",
        });

        reset();
        setOpen(false);
      } else {
        setFormStatus({ success: false, message: result.error });
      }
    } catch (error) {
      setFormStatus({ success: false, message: "An error occurred" });
      console.error(error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        className="flex items-center gap-2"
      >
        <AddCircleOutlineOutlinedIcon /> Create a new workout
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className={`absolute top-[50%] left-[50%] w-[600px] -translate-x-1/2 -translate-y-1/2 ${barlow.className} antialiased font-semibold bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-lg`}
        >
          <h3 className="text-2xl mb-4">Create a new workout</h3>

          {formStatus.message && (
            <Alert
              severity={formStatus.success ? "success" : "error"}
              sx={{ mb: 2 }}
              onClose={() => setFormStatus({})}
            >
              {formStatus.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({
                field: { value, onChange, onBlur, ref },
                fieldState: { error },
              }) => (
                <FormControl fullWidth>
                  <TextField
                    autoFocus
                    name="name"
                    id="name"
                    label="Workout name"
                    variant="outlined"
                    inputRef={ref}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(error)}
                    required
                    fullWidth
                  />
                  <FormHelperText sx={{ color: "red" }}>
                    {error?.message ?? ""}
                  </FormHelperText>
                </FormControl>
              )}
            />

            <Controller
              name="note"
              control={control}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <FormControl fullWidth sx={{ marginY: "1rem" }}>
                  <TextField
                    name="note"
                    id="note"
                    label="Note"
                    variant="outlined"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(error)}
                    multiline
                    rows={4}
                  />
                  <FormHelperText>The note is optional</FormHelperText>
                </FormControl>
              )}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!isValid || !isDirty}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                }}
              >
                <AddOutlinedIcon /> Add
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClose}
                sx={{ marginLeft: "1rem" }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </div>
      </Modal>
    </>
  );
}
