public class Circle {
    
    public static int count;                        // Static field. The Circle class itself has the only copy. 
    
    public int width;                               // Normal field. Each instance has its own copy.
    public String color;                            // Normal field. Each instance has its own copy.
    
    public Circle(int width, String color) {        // Constructor. Some languages actually call this "constructor" but in Java, you just define a method whose name matches the class's name.
        this.width = width;                         // "this" means a new instance that is getting created.
        this.color = color;                         // The constructor's job is to install values into the new instance...
        Circle.count ++;                            // ...and to keep track of how many instances were created.
    }
    
    public void print() {                           // Normal method. You call it using an instance.
        System.out.println("I am a circle, " + this.width + " and " + this.color + "!");
    }                                               // "this" means the instance you called it with.
    
    public static void printCount() {               // Static method. You call it using the Circle class itself, and it can only use static fields because no instance is involved.
        System.out.println("There are " + Circle.count + " circles.");
    }
    
}
