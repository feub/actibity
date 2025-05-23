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
  Stack,
  TextField,
} from "@mui/material";
import { createWorkoutAction } from "@/app/actions/workout";

const workoutFormSchema = z.object({
  name: z
    .string()
    .nonempty("Please specify a name")
    .min(10, "The name is required (10 characters minimum)"),
  note: z.string().optional(),
});
type WorkoutFormFields = z.infer<typeof workoutFormSchema>;

export default function WorkoutForm() {
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});
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

  const { isValid, isDirty, errors } = formState;

  console.log("errors:", errors);

  const onSubmit = async (data: { name: string; note?: string }) => {
    console.log(data);
    try {
      const result = await createWorkoutAction(1, data.name, data.note ?? "");

      if (result.success) {
        setFormStatus({
          success: true,
          message: "Workout created successfully!",
        });
        reset(); // Reset form after successful submission
      } else {
        setFormStatus({ success: false, message: result.error });
      }
    } catch (error) {
      setFormStatus({ success: false, message: "An error occurred" });
      console.error(error);
    }
  };

  return (
    <div className="mb-4 p-4 bg-zinc-900 rounded-xl shadow-md">
      <h3 className="text-2xl mb-2">Create a new workout</h3>

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
        <Stack spacing={2} direction="row" alignItems="center">
          <Controller
            name="name"
            control={control}
            render={({
              field: { value, onChange, onBlur, ref },
              fieldState: { error },
            }) => (
              <FormControl>
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
              <FormControl>
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
        </Stack>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!isValid || !isDirty}
        >
          Add
        </Button>
      </form>
    </div>
  );
}
