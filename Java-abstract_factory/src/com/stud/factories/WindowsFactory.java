package com.stud.factories;

import com.stud.buttons.Button;
import com.stud.buttons.WindowsButton;
import com.stud.checkbox.Checkbox;
import com.stud.checkbox.WindowsCheckbox;

public class WindowsFactory implements GUIFactory {
    @Override
    public Button createButton() {
        return new WindowsButton();
    }

    @Override
    public Checkbox createCheckbox() {
        return new WindowsCheckbox();
    }
}
