import {
  FormLayout,
  Checkbox,
  TextField,
  Button,
  InlineGrid,
  Select,
  Toast,
  Frame,
  BlockStack,
  Popover,
  DatePicker,
  Card,
  Box,
  Page,
} from "@shopify/polaris";
import { useState, useCallback, useEffect, useRef } from "react";
import { useActionData, Form } from "@remix-run/react";

export const action = async ({ request }) => {
  const body = await request.formData();
  return Object.fromEntries(body.entries());
};

function MyForm() {
  function nodeContainsDescendant(rootNode, descendant) {
    if (rootNode === descendant) {
      return true;
    }
    let parent = descendant.parentNode;
    while (parent != null) {
      if (parent === rootNode) {
        return true;
      }
      parent = parent.parentNode;
    }
    return false;
  }

  const actionData = useActionData();
  // date-picker states
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [{ month, year }, setDate] = useState({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
  });

  const [formattedValue, setFormattedValue] = useState(
    selectedDate.toISOString().slice(0, 10)
  );

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    city: "",
    state: "",
    country: "",
    gender: "male",
    is_account: false,
    date: selectedDate,
  });

  const [errors, setErrors] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = useCallback(() => {
    // Check if all state fields are filled
    const allFieldsFilled = Object.entries(formData).every(([name, value]) => {
      if (typeof value === "string") {
        if (value.trim() === "") {
          setErrors((prevErrors) => [
            ...prevErrors,
            `${name.replace("_", " ")} is required`,
          ]);
          return false;
        }
      }
      return true;
    });

    if (allFieldsFilled) {
      setErrors([]);

      setShowSuccessToast(true);
    }
  }, [formData]);

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log("selected date", actionData);
  console.log("form---", formData);

  const datePickerRef = useRef(null);

  function handleOnClose({ relatedTarget }) {
    setVisible(false);
  }

  function handleMonthChange(month, year) {
    setDate({ month, year });
  }

  function handleDateSelection({ end: newSelectedDate }) {
    setSelectedDate(newSelectedDate);
    setFormData((prevState) => ({
      ...prevState,
      date: newSelectedDate,
    }));
    setVisible(false);
  }

  useEffect(() => {
    var formattedValue = selectedDate.toISOString().slice(0, 10);
    setFormattedValue(formattedValue);
  }, [selectedDate]);

  return (
    <Page fullWidth>

    <Form method="POST" onSubmit={handleSubmit}>
      <FormLayout>
        <InlineGrid gap="400" columns={2}>
          <TextField
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={(value) => handleInputChange("first_name", value)}
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={(value) => handleInputChange("last_name", value)}
          />
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={(value) => handleInputChange("city", value)}
          />
          <TextField
            label="State"
            name="state"
            value={formData.state}
            onChange={(value) => handleInputChange("state", value)}
          />
          <TextField
            label="Country"
            name="country"
            value={formData.country}
            onChange={(value) => handleInputChange("country", value)}
          />
          <Select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={(value) => handleInputChange("gender", value)}
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
          />
          <Checkbox
            label="Is Account Holder"
            name="is_account"
            checked={formData.is_account}
            onChange={(checked) => {
              setFormData({ ...formData, is_account: checked });
            }}
          />
        </InlineGrid>
        {/* Date Picker */}
        <Box width="276px" padding={{ xs: 200 }}>
          <Popover
            active={visible}
            autofocusTarget="none"
            preferredAlignment="left"
            fullWidth
            preferInputActivator={false}
            preferredPosition="below"
            preventCloseOnChildOverlayClick
            onClose={handleOnClose}
            activator={
              <TextField
              name="dob"
                role="combobox"
                label={"Start date"}
                value={formattedValue}
                onFocus={() => setVisible(true)}
                autoComplete="off"
              />
            }
          >
            <Card ref={datePickerRef}>
              <DatePicker
                month={month}
                year={year}
                selected={selectedDate}
                onMonthChange={handleMonthChange}
                onChange={handleDateSelection}
              />
            </Card>
          </Popover>
        </Box>

        <div style={{ textAlign: "center" }}>
          <Button submit>Submit</Button>
        </div>
      </FormLayout>
      <Frame>
        {showSuccessToast && (
          <Toast
            content="Successfully submitted"
            onDismiss={() => setShowSuccessToast(false)}
          />
        )}
        {errors.length > 0 && (
          <Toast
            content={errors.join(", ")}
            error
            onDismiss={() => setErrors([])}
          />
        )}
      </Frame>
    </Form>
    </Page>  

  );
}

export default MyForm;
