"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";
import {
  Alert,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { createWorkoutSetWithExercisesAction } from "@/app/actions/workout";
import { barlow } from "@/app/ui/fonts";

const workoutSetFormSchema = z.object({
  workoutId: z.number(),
  reps: z.number().min(1, "Repetition(s) must be at least 1"),
  exercises: z
    .array(
      z.object({
        name: z.string().nonempty("Exercise name is required"),
        weight: z.string().optional(),
        reps_time: z.string().optional(),
        note: z.string().optional(),
      }),
    )
    .min(1, "At least one exercise is required"),
});
type WorkoutSetFormFields = z.infer<typeof workoutSetFormSchema>;

type WorkoutAddSetFormProps = {
  workoutId: number;
  workoutName: string;
};

export default function WorkoutAddSetForm({
  workoutId,
  workoutName,
}: WorkoutAddSetFormProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const { control, handleSubmit, formState, reset } =
    useForm<WorkoutSetFormFields>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(workoutSetFormSchema),
      defaultValues: {
        workoutId: workoutId,
        reps: 1,
        exercises: [
          {
            name: "",
            weight: "",
            reps_time: "",
            note: "",
          },
        ],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  const { isValid } = formState;

  // For debugging
  //const watchAllFields = watch();

  useEffect(() => {
    // Reset form with the current workoutId whenever it changes
    reset({
      workoutId: workoutId,
      reps: 3,
      exercises: [{ name: "", weight: "", reps_time: "", note: "" }],
    });
  }, [workoutId, reset]);

  const onSubmit = async (data: WorkoutSetFormFields) => {
    try {
      const result = await createWorkoutSetWithExercisesAction(
        data.workoutId,
        data.reps,
        data.exercises,
      );

      if (result.success) {
        setFormStatus({
          success: true,
          message: "Set with exercises added successfully!",
        });

        setTimeout(() => {
          reset();
          handleClose();
        }, 3000);
      } else {
        setFormStatus({
          success: false,
          message: result.error || "Failed to create set",
        });
      }
    } catch (error) {
      setFormStatus({ success: false, message: "An error occurred" });
      console.error(error);
    }
  };

  return (
    <>
      <MenuItem onClick={handleOpen}>
        <ListItemIcon>
          <AddCircleOutlineOutlinedIcon />
        </ListItemIcon>
        <ListItemText>Add set</ListItemText>
      </MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-add-set-title"
        aria-describedby="modal-add-set-description"
      >
        <div
          className={`absolute top-[50%] left-[50%] w-[600px] -translate-x-1/2 -translate-y-1/2 ${barlow.className} antialiased font-semibold bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-lg`}
        >
          <h3 className="text-2xl mb-4">Add set to {workoutName}</h3>

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
              name="reps"
              control={control}
              render={({
                field: { value, onChange, onBlur, ref },
                fieldState: { error },
              }) => (
                <FormControl fullWidth>
                  <TextField
                    autoFocus
                    name="reps"
                    id="reps"
                    label="Number of repetitions for this set"
                    variant="outlined"
                    inputRef={ref}
                    value={value}
                    onBlur={onBlur}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      onChange(isNaN(val) ? 1 : val);
                    }}
                    error={Boolean(error)}
                    required
                    type="number"
                    fullWidth
                  />
                  <FormHelperText sx={{ color: "red" }}>
                    {error?.message ?? ""}
                  </FormHelperText>
                </FormControl>
              )}
            />

            <h4 className="text-xl my-4">Exercises</h4>

            {fields.map((field, index) => (
              <div key={field.id} className="mb-6 p-3 rounded-md bg-gray-900">
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="subtitle1">
                    Exercise {index + 1}
                  </Typography>
                  {fields.length > 1 && (
                    <IconButton
                      onClick={() => remove(index)}
                      color="error"
                      size="small"
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  )}
                </div>

                <Controller
                  name={`exercises.${index}.name`}
                  control={control}
                  render={({
                    field: { value, onChange, onBlur, ref },
                    fieldState: { error },
                  }) => (
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <TextField
                        name={`exercises.${index}.name`}
                        id={`exercises-${index}-name`}
                        label="Exercise Name"
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

                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name={`exercises.${index}.weight`}
                    control={control}
                    render={({
                      field: { value, onChange, onBlur, ref },
                      fieldState: { error },
                    }) => (
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                          name={`exercises.${index}.weight`}
                          id={`exercises-${index}-weight`}
                          label="Weight"
                          variant="outlined"
                          inputRef={ref}
                          value={value || ""}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(error)}
                          fullWidth
                        />
                      </FormControl>
                    )}
                  />

                  <Controller
                    name={`exercises.${index}.reps_time`}
                    control={control}
                    render={({
                      field: { value, onChange, onBlur, ref },
                      fieldState: { error },
                    }) => (
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                          name={`exercises.${index}.reps_time`}
                          id={`exercises-${index}-reps_time`}
                          label="Repetitions"
                          variant="outlined"
                          inputRef={ref}
                          value={value || ""}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(error)}
                          fullWidth
                        />
                      </FormControl>
                    )}
                  />
                </div>

                <Controller
                  name={`exercises.${index}.note`}
                  control={control}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <FormControl fullWidth sx={{ mb: 1 }}>
                      <TextField
                        name={`exercises.${index}.note`}
                        id={`exercises-${index}-note`}
                        label="Note"
                        variant="outlined"
                        value={value || ""}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(error)}
                        multiline
                        rows={2}
                      />
                    </FormControl>
                  )}
                />
              </div>
            ))}

            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddOutlinedIcon />}
              onClick={() =>
                append({ name: "", weight: "", reps_time: "", note: "" })
              }
              sx={{ mb: 3 }}
              fullWidth
            >
              Add Another Exercise
            </Button>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!isValid}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                }}
              >
                <AddOutlinedIcon /> Add Set
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
